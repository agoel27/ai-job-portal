import React from "react";
import { Input } from "../components/ui/input.tsx";
import { Textarea } from "../components/ui/textarea.tsx";
import { Label } from "../components/ui/label.tsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select.tsx";
import { Button } from "../components/ui/button.tsx";

function JobDetailsForm() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-100 p-6">
      <div className="space-y-6 w-full max-w-lg">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label className="">Job Title</Label>
            <Input className="bg-white" placeholder="Enter job title" type="text" />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="">Company</Label>
              <Input className="bg-white" placeholder="Enter company name" type="text" />
            </div>
            <div className="space-y-2">
              <Label className="">Job Location</Label>
              <Input className="bg-white" placeholder="Enter address or 'remote'" type="text" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="">Job Type</Label>
              <Select>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Full-time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full-time">Full-time</SelectItem>
                  <SelectItem value="part-time">Part-time</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="">Salary</Label>
              <Input placeholder="Enter salary" type="text" className="bg-white" />
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <Label className="">Description</Label>
            <Textarea placeholder="Enter description" rows={4} className="bg-white" />
          </div>
        </div>

        <Button variant="default" size="lg" className="mt-6 w-full bg-purple-900 text-white">Next</Button>
      </div>
    </div>
  );
}

export { JobDetailsForm };