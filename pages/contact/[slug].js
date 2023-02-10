
import { ContactForm, Categories, PostWidget} from '../../components';
import { useRouter } from 'next/router';

const Contact = () => {
    const router = useRouter()

    if(router.isFallback){
        return <Loader />
    }
    
    return (
        <div className="container mx-auto px-10 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="col-span-1 lg:col-span-8">
                    <ContactForm/>
                </div>
                <div className="col-span-1 lg:col-span-4">
                    <div className="relative lg:sticky top-8">
                        <PostWidget />
                        <Categories />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Contact;