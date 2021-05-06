export const onLikePress = (likes:number, isLiked: boolean) => {
    const likesToAdd = isLiked ? -1 : 1;
    const postLikes = likesToAdd + likes;
    const setIsLiked = !isLiked
    return {
        postLikes ,
        setIsLiked 
    }
    /**setPost({
      ...post,
      likes: post.likes + likesToAdd,
    });

    setIsLiked(!isLiked); */
  };