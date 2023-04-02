import { useRouter } from 'next/router';

// Hooks
import { useAuth } from '../../hooks/useAuth';

// Components
import BlogCreate from '../../shared_pages/blogCreate';

export default function CreateBlog() {
    // Hooks
    const { user, userLoading } = useAuth();
    const router = useRouter();

    if (!userLoading && user.role === 'user') {
        // Send them back to home
        router.push('/');
    }

    return (
        <BlogCreate editing={false} />
    )
}