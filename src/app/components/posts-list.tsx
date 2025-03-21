import PostCard from "./post-card";
import {type Post} from "@/app/types/posts"

export function PostsList({ posts }: { posts: Post[] }) {
  return (
    <>
      {
        posts?.map(post => {
          const {
            id,
            user,
            content
          } = post

          const {
            user_name: userName,
            name: userFullName,
            avatar_url: avatarUrl
          } = user

          return (
            < PostCard
              avatarUrl={avatarUrl ?? ''}
              content={content}
              key={id}
              userFullName={userFullName ?? ''}
              userName={userName ?? ''}
            />
          )
        })
      }

    </>
  )
}