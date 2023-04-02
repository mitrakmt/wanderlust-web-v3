import {
    useEffect
} from 'react';
import { useRouter } from 'next/router';

// Hooks
import { useAuth } from '../../../hooks/useAuth';

// Components
import BlogCreate from '../../../shared_pages/BlogCreate';

export default function EditBlogPage() {
    // Hooks
    const { user, userLoading } = useAuth();
    const router = useRouter();
    const { blogId } = router.query

    if (!userLoading && user.role === 'user') {
        // Send them back to home
        router.push('/');
    }

    return (
        <BlogCreate editing={true} blogId={blogId} />
    )
}