import {Right} from '../icons/Right.tsx';
import {Link} from 'react-router-dom';

function Hero() {
    return (
        <section className="hero max-w-4xl mx-auto px-4 mt-4">
            <div className='py-12 flex flex-col justify-center'>
                <h1 className='text-4xl font-semibold'>
                    <span className='text-secondary'>Betting</span> turns uncertainty into excitement - a game of instinct, luck, and bold moves.
                </h1>
                <p className='my-6 text-primary text-md'>
                    Betting is what brings excitement to daily life
                </p>
                <div className='flex gap-4 text-sm'>
                    <button className='px-4 py-2 bg-secondary button' type='button'>
                        <Link to="/my-bets" className="flex gap-2 items-center justify-center">
                            Place bet
                            <Right/>
                        </Link>
                    </button>
                    <button className='flex gap-2 py-2 button'>
                        Learn more
                        <Right/>
                    </button>
                </div>
            </div>
            <div className='flex justify-center items-center'>
                <img src="/wallet3.png" alt='wallet' className='max-h-92 rounded-lg object-contain'/>
            </div>
        </section>
    );
}

export default Hero;