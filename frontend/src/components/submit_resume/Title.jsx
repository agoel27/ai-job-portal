const Title = ({ children }) => {
    return (
        <div className="group absolute w-full top-3">
            <p className="text-4xl ml-[20%] font-bold text-ai-purple-200 mb-2">
                {children}
            </p>
            <div className="w-[60%] mx-auto border-b border-black"></div>
        </div>
    );
};
  
export default Title;