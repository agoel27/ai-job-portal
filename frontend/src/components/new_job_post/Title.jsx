import "../../index.css";

const Title = ({ children }) => {
  return (
    <p className="text-md sm:text-2xl xl:text-3xl text-[#382D5E] font-bold">
      {children}
    </p>
  );
};

export default Title;
