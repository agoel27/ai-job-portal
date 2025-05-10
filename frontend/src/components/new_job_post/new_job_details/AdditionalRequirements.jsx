import { Checkbox } from "../../ui/checkbox";

const AdditionalRequirements = () => {
  return (
    <div className="flex flex-col w-3/4 md:w-2/3 mx-auto">
      <div className="text-xl sm:text-2xl text-black font-semibold my-3">
        Additional Requirements
      </div>
      <div className="flex flex-col w-full bg-white p-8 justify-center rounded-md border border-black">
        <div className="ml-1 space-y-7 md:ml-6">
          <div className="flex items-center space-x-2">
            <Checkbox id="cover-letter" />
            <label
              htmlFor="cover-letter"
              className="text-sm sm:text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Cover Letter
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="portfolio" />
            <label
              htmlFor="portfolio"
              className="text-sm sm:text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Portfolio
            </label>
          </div>
          <div className="flex items-start space-x-2">
            <Checkbox id="optional-links" />
            <div>
              <label
                htmlFor="optional-links"
                className="text-sm sm:text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Optional Links
              </label>
              <p className="text-sm sm:text-lg text-muted-foreground mt-1">
                (LinkedIn, Github, etc.)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdditionalRequirements;
