import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { SelectGroup } from "@radix-ui/react-select";
import { Toggle } from "@/components/ui/toggle"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"

  
const Form = () => {
    return (
        <div className="w-[50%] xl:w-[40%] mt-[4vh] flow-root mx-auto">
            <div>
                <div className="float-left mr-[4%] xl:mr-[2%]">
                    <Select>
                        <SelectGroup className="text-xl text-[#382D5E] mb-[1vh]">Education</SelectGroup>
                        <SelectTrigger>
                            <SelectValue placeholder="High school graduate or equivalent" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="highschool">High School Diploma</SelectItem>
                            <SelectItem value="associates">Associate's Degree</SelectItem>
                            <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
                            <SelectItem value="masters">Master's Degree</SelectItem>
                            <SelectItem value="phd">Doctorate</SelectItem>
                            <SelectItem value="none">None</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="float-right ml-[4%] xl:ml-[2%]">
                    <Select>
                        <SelectGroup className="text-xl text-[#382D5E] mb-[1vh]">Major</SelectGroup>
                        <SelectTrigger>
                            <SelectValue placeholder="Select major" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="computerscience">Computer Science</SelectItem>
                            <SelectItem value="computerengineering">Computer Engineering</SelectItem>
                            <SelectItem value="datascience">Data Science</SelectItem>
                            <SelectItem value="electricalengineering">Electrical Engineering</SelectItem>
                            <SelectItem value="mathematics">Mathematics</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="mt-[10vh]">
                <div className="float-left mr-[4%] xl:mr-[2%]">
                    <Select>
                        <SelectGroup className="text-xl text-[#382D5E] mb-[1vh]">Standing</SelectGroup>
                        <SelectTrigger>
                            <SelectValue placeholder="Senior" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="freshman">Freshman</SelectItem>
                            <SelectItem value="sophomore">Sophomore</SelectItem>
                            <SelectItem value="junior">Junior</SelectItem>
                            <SelectItem value="senior">Senior</SelectItem>
                            <SelectItem value="na">Not applicable</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="float-right ml-[4%] xl:ml-[2%]">
                    <Select>
                        <SelectGroup className="text-xl text-[#382D5E] mb-[1vh]">Experience</SelectGroup>
                        <SelectTrigger>
                            <SelectValue placeholder="No experience"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="noexperience">No experience</SelectItem>
                            <SelectItem value="under1">under 1 year</SelectItem>
                            <SelectItem value="1-2">1-2 years</SelectItem>
                            <SelectItem value="3-4">3-4 years</SelectItem>
                            <SelectItem value="5+">5+ years</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="float-left mt-[4vh]">
                <div className="text-xl text-[#382D5E] mb-[1vh]">Skills</div>
                <div className="float-left flex flex-wrap gap-2">
                    <Toggle>Communication</Toggle>
                    <Toggle>Teamwork</Toggle>
                    <Toggle>Skill 1</Toggle>
                    <Toggle>Skill 2</Toggle>
                    <Toggle>Skill 3</Toggle>
                    <Toggle>Skill 4</Toggle>
                    <Toggle>Skill 5</Toggle>
                    <Toggle>Other</Toggle>
                </div>
            </div>
            <div className="float-left mr-[4%] xl:mr-[2%] mt-[4vh]">
                <Select>
                    <SelectGroup className="text-xl text-[#382D5E] mb-[1vh]">Work Authorization</SelectGroup>
                    <SelectTrigger>
                        <SelectValue placeholder="US work authorization required" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="authorized">I am authorized to work in the US.</SelectItem>
                        <SelectItem value="notauthorized">I am NOT authorized to work in the US.</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="float-start w-full text-xl text-[#382D5E] mt-[4vh] mb-[1vh]">Requirements</div>
            <div className="float-start w-full bg-white border border-[#382D5E] rounded-md p-4 space-y-3">
                <div className="space-x-2">
                    <Checkbox id="backgroundcheck" />
                    <label
                        htmlFor="backgroundcheck"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Background Check
                    </label>
                </div>
                <div className="space-x-2">
                    <Checkbox id="onsite" />
                    <label
                        htmlFor="onsite"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        On-site work
                    </label>
                </div>
                <div className="space-x-2">
                    <Checkbox id="multilingual" />
                    <label
                        htmlFor="multilingual"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Multilingual
                    </label>
                    <Input className="ml-7 w-[60%] border-b border-[#382D5E]" placeholder="Enter languages"/>
                </div>
                <div className="space-x-2">
                    <Checkbox id="certifications" />
                    <label
                        htmlFor="certifications"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Certifications
                    </label>
                    <Input className="ml-7 w-[60%] border-b border-[#382D5E]" placeholder="Enter certifications"/>
                </div>
                <div className="flex space-x-2">
                    <Checkbox id="other" />
                    <Input className="w-[60%] border-b border-[#382D5E]" placeholder="Other"/>
                </div>
            </div>
        </div>
    )
};

export default Form;