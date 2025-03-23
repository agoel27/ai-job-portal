import CircleCheckCurrent from './CircleCheckCurrent';
import CircleCheckIncomplete from './CircleCheckIncomplete';
import CircleCheckComplete from './CircleCheckComplete';
import '../../styles/ProgressBar.css'
import '../../index.css';

const ProgressBar = ({ progress }) => {
    
    return (
        <div className='w-screen'>
            <div className='mx-auto flex flex-row w-2/3 xl:w-1/2 justify-center items-center'>
                
                {progress == 0 ? <CircleCheckCurrent /> : <CircleCheckComplete />}
                
                <div className='w-full relative flex justify-center'>
                    <div className={`absolute z-10 ${progress < 1 ? 'bg-white' : 'bg-[#382D5E]'} h-0.5 md:h-1 w-full ${progress === 1 && "clip-bar"}`} />
                    <div className="absolute bg-white h-0.5 md:h-1 w-full" />
                </div>
                
                {progress == 0 && <CircleCheckIncomplete />}
                {progress == 1 && <CircleCheckCurrent />}
                {progress == 2 && <CircleCheckComplete />}
                
                <div className='w-full relative flex justify-center'>
                    <div className={`absolute z-10 ${progress < 2 ? 'bg-white' : 'bg-[#382D5E]'} h-0.5 md:h-1 w-full ${progress === 2 && "clip-bar"}`} />
                    <div className="absolute bg-white h-0.5 md:h-1 w-full" />
                </div>
                
                {progress < 2 ? <CircleCheckIncomplete /> : <CircleCheckCurrent />}
            
            </div>
        </div>
    )
}

export default ProgressBar;