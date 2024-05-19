"use client"
import { useUser } from '@clerk/nextjs';
import styles from './page.module.css'

const UserDetails = () => {
    const { user } = useUser();
    console.log("pavic user",user?.unsafeMetadata)
  return (
    <div>
        {user?.fullName}
    </div>
  )
}

export default UserDetails