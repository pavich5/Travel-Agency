"use client";
import React, { useState, useEffect } from "react";
import { Button, Form, Input, Modal, notification } from "antd";
import axios from "axios";
import { LikeOutlined, DeleteOutlined } from "@ant-design/icons";
import { useEdgeStore } from "../lib/edgestore";
import "./page.styles.css";
import { NotificationType, Post, FormData, Comment } from "../types";
import { UploadOutlined, DownOutlined } from "@ant-design/icons";
import { useUser } from "@clerk/clerk-react";
import { Spinner } from "@chakra-ui/react";

const Blogs = () => {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    images: "",
  });
  const { isSignedIn, user } = useUser();
  const [api, contextHolder] = notification.useNotification();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [posts, setPosts] = useState<Post[] | undefined>([]);
  const [originalPosts, setOriginalPosts] = useState<Post[]>([]);
  const [commentInput, setCommentInput] = useState<{
    [postId: string]: string;
  }>({});
  const [likedPosts, setLikedPosts] = useState<string[]>([]);
  const [postImageFile, setPostImageFile] = useState<File>();
  const [postImageUrl, setPostImageUrl] = useState<{
    url: string;
    thumbmailUrl: string | null;
  }>();
  const [visibleComments, setVisibleComments] = useState<string[]>([]);
  const [seeAllPosts, setSeeAllPosts] = useState(true);

  const { edgestore } = useEdgeStore();

  useEffect(() => {
    getAllPosts();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const openNotificationWithIcon = (
    type: NotificationType,
    message: string,
    description?: string
  ) => {
    api[type]({
      message: message,
      description: description,
    });
  };

  const getAllPosts = async () => {
    try {
      const response = await axios.get("https://travel-agency-plum.vercel.app/api/getAllPosts");
      setPosts(response.data);
      setOriginalPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
      openNotificationWithIcon(
        "error",
        "Failed to fetch posts",
        error as string
      );
    }
  };

  const handleCreatePost = async () => {
    try {
        const response = await axios.post(
            "https://travel-agency-plum.vercel.app/api/createPost",
            {
                ...formData,
                author: {
                    userName: user?.fullName,
                    userId: user?.id,
                    userImage: user?.imageUrl,
                },
            }
        );

        const data = response.data;
        console.log("pavic", data);

        if (response.status === 201) {
            openNotificationWithIcon("success", "Successfully created post");
            setFormData({
                title: "",
                description: "",
                images: "",
            });
            setPostImageUrl({
                thumbmailUrl: "",
                url: "",
            });
            getAllPosts();
            setIsModalOpen(false);
        }
    } catch (error) {
        console.error("Error creating post:", error);
        openNotificationWithIcon(
            "error",
            "Failed to create post",
            error as string
        );
    }
};


  const removePost = async (postId: string) => {
    try {
      await axios.delete(`https://travel-agency-plum.vercel.app/api/removePost`, {
        params: { postId },
      });
      getAllPosts();
      openNotificationWithIcon("success", "Post deleted successfully");
    } catch (error) {
      console.error("Error deleting post:", error);
      openNotificationWithIcon(
        "error",
        "Failed to delete post",
        error as string
      );
    }
  };

  const handleCommentSubmit = async (
    postId: string,
    comment: string,
    comments: Comment[]
  ) => {
    if (!isSignedIn) {
      openNotificationWithIcon("error", "Please sign in to write comments");
      return;
    }
    try {
      const response = await axios.patch(
        `https://travel-agency-plum.vercel.app/api/addComment`,
        {
          _id: postId,
          comments: [
            ...comments,
            {
              userName: user?.fullName,
              userId: user?.id,
              userImage: user?.imageUrl,
              content: comment,
            },
          ],
        }
      );
      if (response.status === 200) {
        openNotificationWithIcon("success", "Comment added successfully");
        setCommentInput((prevCommentInput) => ({
          ...prevCommentInput,
          [postId]: "",
        }));
        getAllPosts();
      }
    } catch (error) {
      console.error("Error adding comment:", error);
      openNotificationWithIcon(
        "error",
        "Failed to add comment",
        error as string
      );
    }
  };

  const handleRemoveComment = async (postId: string, comments?: Comment[]) => {
    try {
      const response = await axios.patch(
        `http://https://travel-agency-plum.vercel.app/api/addComment`,
        {
          _id: postId,
          comments: comments,
        }
      );
      if (response.status === 200) {
        openNotificationWithIcon("success", "Comment deleted successfully");
        getAllPosts();
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
      openNotificationWithIcon(
        "error",
        "Failed to delete comment",
        error as string
      );
    }
  };

  const handleLikePost = async (postId: string, likes: number) => {
    if (!isSignedIn) {
      openNotificationWithIcon("error", "Please sign in to like posts");
      return;
    }
    try {
      const response = await axios.patch(`https://travel-agency-plum.vercel.app/api/likePost`, {
        _id: postId,
        likes: likes,
      });
      if (response.status === 200) {
        setLikedPosts((prevLikedPosts) =>
          prevLikedPosts.includes(postId)
            ? prevLikedPosts.filter((id) => id !== postId)
            : [...prevLikedPosts, postId]
        );
        getAllPosts();
      }
    } catch (error) {
      console.error("Error liking post:", error);
      openNotificationWithIcon("error", "Failed to like post");
    }
  };

  const toggleCommentsVisibility = (postId: string) => {
    setVisibleComments((prevVisibleComments) =>
      prevVisibleComments.includes(postId)
        ? prevVisibleComments.filter((id) => id !== postId)
        : [...prevVisibleComments, postId]
    );
  };

  const handleTogglePosts = () => {
    const filteredPosts = originalPosts.filter(
      (post) => post.author.userId === user?.id
    );

    if (seeAllPosts && filteredPosts.length === 0) {
      openNotificationWithIcon(
        "error",
        "No posts found",
        "There are no posts created by you."
      );
    }
    setPosts(seeAllPosts ? filteredPosts : originalPosts);
    setSeeAllPosts(!seeAllPosts);
  };

  return (
    <div className="container">
      <div className="headerWrapperBlogs">
        <h1 className="page-title">Travel Experiences</h1>
        {contextHolder}
        <div className="new-post">
          <Button
            type="primary"
            onClick={() => {
              if (!isSignedIn) {
                openNotificationWithIcon(
                  "error",
                  "Please sign in to create posts"
                );
                return;
              }
              setIsModalOpen(true);
            }}
          >
            Create Post
          </Button>
          {isSignedIn && (
            <Button
              style={{ marginLeft: "10px" }}
              type="primary"
              onClick={handleTogglePosts}
            >
              {seeAllPosts ? "See my posts" : "See all posts"}
            </Button>
          )}
        </div>
        <Modal
          title="Create Post"
          open={isModalOpen}
          onOk={handleCreatePost}
          onCancel={() => {
            setIsModalOpen(false);
          }}
        >
          <Form layout="vertical">
            <Form.Item label="Title" required>
              <Input
                name="title"
                value={formData.title}
                onChange={handleInputChange}
              />
            </Form.Item>
            <Form.Item label="Description" required>
              <Input.TextArea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                autoSize={{ minRows: 3 }}
              />
            </Form.Item>
            <Form.Item label="Image" required>
              <div className="imageInputWrapper">
                <input
                  type="file"
                  onChange={(e) => {
                    setPostImageFile(e.target.files?.[0]);
                  }}
                />
                <Button
                  style={{ marginTop: "10px" }}
                  onClick={async () => {
                    if (postImageFile) {
                      const res = await edgestore.myPublicImages.upload({
                        file: postImageFile,
                      });
                      setPostImageUrl({
                        url: res.url,
                        thumbmailUrl: res.thumbnailUrl,
                      });
                      setFormData((prevData: any) => ({
                        ...prevData,
                        images: res.url,
                      }));
                    }
                  }}
                >
                  Upload File <UploadOutlined />
                </Button>
                {Boolean(postImageUrl?.url) && (
                  <img
                    className="createPostImg"
                    src={postImageUrl?.url}
                    alt=""
                  />
                )}
              </div>
            </Form.Item>
          </Form>
        </Modal>
      </div>
      <div className="post-list">
        {posts?.length === 0 && (
          <div className="spinnerDiv">
            <Spinner className="spinner" />
          </div>
        )}
        {posts?.map((post) => (
          <div key={post._id} className="post">
            <div className="post-header">
              <h3>{post.title}</h3>
              <div className="usernameWrapper">
                <p>{post.author.userName}</p>
                <img className="userImage" src={post.author.userImage} alt="" />
              </div>
            </div>
            <div className="post-content">
              <p>{post.description}</p>
              {post.images && <img src={post.images[0]} alt="" />}
            </div>
            <div className="post-actions">
              <Button
                icon={<LikeOutlined />}
                type={likedPosts.includes(post._id) ? "primary" : "default"}
                onClick={() =>
                  handleLikePost(
                    post._id,
                    likedPosts.includes(post._id)
                      ? post.likes - 1
                      : post.likes + 1
                  )
                }
              >
                {post.likes || 0}
              </Button>
              <Input
                placeholder="Add a comment..."
                value={commentInput[post._id] ?? ""}
                onChange={(e) =>
                  setCommentInput({
                    ...commentInput,
                    [post._id]: e.target.value,
                  })
                }
              />
              <Button
                type="primary"
                onClick={() =>
                  handleCommentSubmit(
                    post._id,
                    commentInput[post._id],
                    post.comments ?? []
                  )
                }
              >
                Comment
              </Button>
              {user?.id === post.author.userId && (
                <Button onClick={() => removePost(post._id)}>Delete</Button>
              )}
            </div>
            <Button onClick={() => toggleCommentsVisibility(post._id)}>
              {visibleComments.includes(post._id) ? (
                "Hide Comments"
              ) : (
                <>
                  See All Comments({post.comments?.length}) <DownOutlined />
                </>
              )}
            </Button>
            {visibleComments.includes(post._id) && (
              <div className="comments">
                {post.comments?.map((comment, index) => (
                  <div key={index} className="comment">
                    <p>{comment.content}</p>
                    <div className="commentFooter">
                      <img src={comment.userImage} alt="" />
                      {user?.id === comment.userId && (
                        <Button
                          onClick={() => {
                            const updatedComments = post.comments?.filter(
                              (item) => item._id !== comment._id
                            );
                            handleRemoveComment(post._id, updatedComments);
                          }}
                        >
                          <DeleteOutlined />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
