import SectionHeaders from '../layouts/SectionHeaders.tsx';
import {FaEuroSign, FaLock} from 'react-icons/fa';
import {FiTrendingUp} from 'react-icons/fi';
import Hero from '../layouts/Hero.tsx';

function Home() {
    return (
        <>
            <Hero/>
            <section className="text-center my-10" id="bet">
                <SectionHeaders subHeader={''} mainHeader={"Welcome to GameVault"}/>
                <div className="text-primary max-w-lg mx-auto mt-4 flex flex-col gap-4">
                    <div className="flex">
                        <div className="pt-1">
                            <FiTrendingUp className="text-secondary" size={20}/>
                        </div>
                        <p className="italic font-normal text-xl">
                            GameVault is a cutting-edge digital wallet designed exclusively for online gaming and
                            betting platforms.
                        </p>
                    </div>
                    <div className="flex gap-1">
                        <div className="pt-1">
                            <FaLock className="text-secondary" size={16}/>
                        </div>
                        <p className="italic font-normal text-xl">
                            We guarantee safe financial transactions, so your funds and identity are always protected.
                        </p>
                    </div>
                    <div className="flex gap-1">
                        <div className="pt-1">
                            <FaEuroSign className="text-secondary" size={18}/>
                        </div>
                        <p className="italic font-normal text-xl">
                            Effortlessly manage your betting balance with full support for Euro (€).
                        </p>
                    </div>
                </div>
            </section>
            <div className="relative">
                <img src="/euro4.png" alt='euro4' className="max-h-92 mx-auto rounded-lg"/>
            </div>
        </>
    );
}

export default Home;