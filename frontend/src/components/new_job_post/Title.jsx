import '../../index.css';

const Title = ({ title }) => {
    return (
        <p className="text-md sm:text-2xl xl:text-3xl text-[#382D5E] font-bold">
            {title}
        </p>
    )
}

export default Title;