import SectionHeaders from '../layouts/SectionHeaders.tsx';

function Contact() {
    return (
        <section className="text-center my-8" id="contact">
            <SectionHeaders
                subHeader={"Don't hesitate"}
                mainHeader={"Contact us"}
            />
            <div className="mt-8">
                <a className="text-4xl text-white" href="mailto:tglab@support.com">
                    gamewault@support.com
                </a>
            </div>
        </section>
    );
}

export default Contact;