import { useEndpoint } from "@builder.io/qwik-city";
import { Layout } from 'BlogPage'

export const onGet = async ({ params }) => {
    return {
        name: "John"
    }
};

const Blog = () => {
    // const blogData = useEndpoint();

    return <Layout />
}

export default Blog
