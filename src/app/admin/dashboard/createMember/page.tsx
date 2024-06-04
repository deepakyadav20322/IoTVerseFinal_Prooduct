"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import axios from "axios";
import ButtonLoader from "@/components/custom/buttonLoader";
import { useRouter } from "next/navigation";




const CreateMember = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [profileImg, setProfileImg] = useState<File | null>(null);
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    github: "",
    linkedin: "",
    twitter: "",
    status: "",
    imageUrl: { public_id: "", secure_url: "" },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImg(e.target.files[0]);
    }
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      status: value,
    }));
  };

  // upload the profile image in cloudinary
  const uploadFile = async (type: string) => {
    const data = new FormData();
    if (profileImg) {
      data.append("file", profileImg);
      data.append("upload_preset", "image_preset");
    }
    try {
      const cloudName = process.env.NEXT_PUBLIC_CLODINARY_CLOUD_NAME;
      const api = `https://api.cloudinary.com/v1_1/${cloudName}/${type}/upload`;

      const res = await axios.post(api, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const { secure_url, public_id } = res.data;
      console.log(secure_url, public_id);
      return { secure_url, public_id };
    } catch (error) {
      console.log("error when file uploaded to cloudinary ", error);
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    //-------- get imgURL like after uploading the image =>(start)--------
    let imageUploadData: any;
    if (!profileImg) {
      toast.error("Please select image.");
      setLoading(false);
      return;
    }

    if (profileImg) {
      imageUploadData = await uploadFile("image");
      if (!imageUploadData) {
        toast.error("Error in image uploading");
        setLoading(false);
        return;
      }
    }
    //------------------ get imgURL =>( END )-------------------------

    // Check if all required fields are filled...........
    if (
      !formData.name ||
      !formData.position ||
      !formData.linkedin ||
      !formData.status
    ) {
      toast.error("Please fill all required fields", { duration: 3500 });
      return;
    }

    // made an object which sends to the server----------
    const serverFormData = { ...formData, imageUrl: imageUploadData };

    try {
      const response = await axios.post("/api/admin/members", serverFormData, {
        headers: { "Content-Type": "application/json" },
      });
      if (response.status === 200) {
        toast.success("Member added successfully");
        // Reset form after successful submission
        setFormData({
          name: "",
          position: "",
          github: "",
          linkedin: "",
          twitter: "",
          status: "",
          imageUrl: { public_id: "", secure_url: "" },
        });
        setLoading(false);
        router.push("/admin/dashboard")
      }
    } catch (error) {
      toast.error("Server error");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Card className="w-full max-w-xl mx-auto my-4">
        <CardHeader>
          <CardTitle>Add New Member</CardTitle>
          <CardDescription>
            Fill out the form to add a new member to your team.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">
                  Name<span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  placeholder="Enter name"
                  name="name"
                  onChange={handleChange}
                  value={formData.name}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="position">
                  Position<span className="text-red-500">*</span>
                </Label>
                <Input
                  id="position"
                  placeholder="Enter position"
                  name="position"
                  onChange={handleChange}
                  value={formData.position}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">
                Status<span className="text-red-500">*</span>
              </Label>
              <Select onValueChange={handleSelectChange} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="github">GitHub </Label>
              <Input
                id="github"
                type="url"
                placeholder="Enter GitHub profile URL"
                name="github"
                onChange={handleChange}
                value={formData.github}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="linkedin">
                LinkedIn<span className="text-red-500">*</span>
              </Label>
              <Input
                id="linkedin"
                type="url"
                placeholder="Enter LinkedIn profile URL"
                name="linkedin"
                onChange={handleChange}
                value={formData.linkedin}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="twitter">Twitter</Label>
              <Input
                id="twitter"
                type="url"
                placeholder="Enter Twitter profile URL"
                name="twitter"
                onChange={handleChange}
                value={formData.twitter}
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="picture">Picture</Label>
              <Input
                id="picture"
                type="file"
                name="image"
                onChange={handleFileChange}
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className={`${
                loading ? "bg-slate-200 text-gray-400 hover:bg-slate-200" : ""
              } w-full`}
            >
              {loading ? (
                <>
                  <ButtonLoader />
                  <span className="ml-2">Processing.....</span>
                </>
              ) : (
                "Add Member"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateMember;
