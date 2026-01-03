// "use client";

// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { toast } from "sonner";

// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Button } from "@/components/ui/button";

// const createEventSchema = z.object({
//   title: z.string().min(3),
//   description: z.string().min(10),
//   overview: z.string().min(10),
//   venue: z.string().min(2),
//   location: z.string().min(2),
//   date: z.string(),
//   time: z.string(),
//   mode: z.enum(["online", "offline", "hybrid"]),
//   audience: z.string(),
//   organizer: z.string(),
//   tags: z.string(),
//   agenda: z.string(),
//   image: z.any(),
// });

// type CreateEventValues = z.infer<typeof createEventSchema>;

// export default function CreateEvent() {
//   const form = useForm<CreateEventValues>({
//     resolver: zodResolver(createEventSchema),
//     defaultValues: {
//       title: "",
//       description: "",
//       overview: "",
//       venue: "",
//       location: "",
//       date: "",
//       time: "",
//       mode: undefined,
//       audience: "",
//       organizer: "",
//       tags: "",
//       agenda: "",
//     },
//   });

//   async function onSubmit(values: CreateEventValues) {
//     try {
//       const formData = new FormData();

//       //   Object.entries(values).forEach(([key, value]) => {
//       //     if (key === "tags" || key === "agenda") {
//       //       formData.append(
//       //         key,
//       //         JSON.stringify(
//       //           value
//       //             .split("\n")
//       //             .map((v: string) => v.trim())
//       //             .filter(Boolean)
//       //         )
//       //       );
//       //     } else if (key === "image") {
//       //       formData.append("image", value[0]);
//       //     } else {
//       //       formData.append(key, value);
//       //     }
//       //   });

//       Object.entries(values).forEach(([key, value]) => {
//         if (key === "tags" || key === "agenda") {
//           const parsed = (value as string)
//             .split("\n")
//             .map((v: string) => v.trim())
//             .filter(Boolean);

//           formData.append(key, JSON.stringify(parsed));
//         } else if (key === "image") {
//           formData.append("image", value[0]);
//         } else {
//           formData.append(key, value as string);
//         }
//       });

//       const res = await fetch("/api/events", {
//         method: "POST",
//         body: formData,
//       });

//       if (!res.ok) throw new Error();

//       toast.success("Event created successfully");
//       form.reset();
//     } catch {
//       toast.error("Failed to create event");
//     }
//   }

//   return (
//     <div className="mx-auto max-w-5xl space-y-8">
//       {/* Header */}
//       <div className="space-y-1">
//         <h1 className="text-2xl font-semibold tracking-tight">
//           Create New Event
//         </h1>
//         <p className="text-sm text-muted-foreground">
//           Fill in the details below to publish a new event.
//         </p>
//       </div>

//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//           {/* Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {/* Title */}
//             <FormField
//               control={form.control}
//               name="title"
//               render={({ field }) => (
//                 <FormItem className="space-y-1">
//                   <FormLabel className="text-sm font-medium">
//                     Event Title
//                   </FormLabel>
//                   <FormControl>
//                     <Input
//                       {...field}
//                       placeholder="Webstorm Webinars 3034"
//                       className="h-11"
//                       onChange={(e) => field.onChange(e.target.value)}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             {/* Image */}
//             <FormField
//               control={form.control}
//               name="image"
//               render={({ field }) => (
//                 <FormItem className="space-y-1">
//                   <FormLabel className="text-sm font-medium">
//                     Event Image
//                   </FormLabel>
//                   <FormControl>
//                     <Input
//                       type="file"
//                       accept="image/*"
//                       onChange={(e) => field.onChange(e.target.files)}
//                       className="h-11 file:mr-4 file:rounded-md file:border-0 file:bg-muted file:px-4 file:py-2"
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             {/* Venue */}
//             <FormField
//               control={form.control}
//               name="venue"
//               render={({ field }) => (
//                 <FormItem className="space-y-1">
//                   <FormLabel>Venue</FormLabel>
//                   <FormControl>
//                     <Input {...field} className="h-11" />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             {/* Location */}
//             <FormField
//               control={form.control}
//               name="location"
//               render={({ field }) => (
//                 <FormItem className="space-y-1">
//                   <FormLabel>Location</FormLabel>
//                   <FormControl>
//                     <Input {...field} className="h-11" />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             {/* Date */}
//             <FormField
//               control={form.control}
//               name="date"
//               render={({ field }) => (
//                 <FormItem className="space-y-1">
//                   <FormLabel>Date</FormLabel>
//                   <FormControl>
//                     <Input type="date" {...field} className="h-11" />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             {/* Time */}
//             <FormField
//               control={form.control}
//               name="time"
//               render={({ field }) => (
//                 <FormItem className="space-y-1">
//                   <FormLabel>Time</FormLabel>
//                   <FormControl>
//                     <Input type="time" {...field} className="h-11" />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             {/* Mode */}
//             <FormField
//               control={form.control}
//               name="mode"
//               render={({ field }) => (
//                 <FormItem className="space-y-1">
//                   <FormLabel>Mode</FormLabel>
//                   <Select
//                     onValueChange={field.onChange}
//                     defaultValue={field.value}
//                   >
//                     <FormControl>
//                       <SelectTrigger className="h-11">
//                         <SelectValue placeholder="Select mode" />
//                       </SelectTrigger>
//                     </FormControl>
//                     <SelectContent>
//                       <SelectItem value="offline">Offline</SelectItem>
//                       <SelectItem value="online">Online</SelectItem>
//                       <SelectItem value="hybrid">Hybrid</SelectItem>
//                     </SelectContent>
//                   </Select>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             {/* Audience */}
//             <FormField
//               control={form.control}
//               name="audience"
//               render={({ field }) => (
//                 <FormItem className="space-y-1">
//                   <FormLabel>Audience</FormLabel>
//                   <FormControl>
//                     <Input {...field} className="h-11" />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             {/* Organizer */}
//             <FormField
//               control={form.control}
//               name="organizer"
//               render={({ field }) => (
//                 <FormItem className="space-y-1">
//                   <FormLabel>Organizer</FormLabel>
//                   <FormControl>
//                     <Input {...field} className="h-11" />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>

//           {/* Full Width */}
//           <FormField
//             control={form.control}
//             name="description"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Description</FormLabel>
//                 <FormControl>
//                   <Textarea {...field} className="min-h-[120px]" />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="overview"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Overview</FormLabel>
//                 <FormControl>
//                   <Textarea {...field} className="min-h-[120px]" />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="agenda"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Agenda (one per line)</FormLabel>
//                 <FormControl>
//                   <Textarea {...field} className="min-h-[120px]" />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="tags"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Tags (one per line)</FormLabel>
//                 <FormControl>
//                   <Textarea {...field} className="min-h-[80px]" />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <Button
//             type="submit"
//             className="h-11 w-full md:w-auto px-8"
//             disabled={form.formState.isSubmitting}
//           >
//             {form.formState.isSubmitting ? "Creating..." : "Create Event"}
//           </Button>
//         </form>
//       </Form>
//     </div>
//   );
// }

"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

// --- Validation schema ---
const createEventSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  overview: z.string().min(10),
  venue: z.string().min(2),
  location: z.string().min(2),
  date: z.string(),
  time: z.string(),
  mode: z.enum(["online", "offline", "hybrid"]),
  audience: z.string(),
  organizer: z.string(),
  tags: z.string(),
  agenda: z.string(),
  image: z.any().optional(),
});

type CreateEventValues = z.infer<typeof createEventSchema>;

export default function CreateEventPage() {
  const form = useForm<CreateEventValues>({
    resolver: zodResolver(createEventSchema),
    defaultValues: {
      title: "",
      description: "",
      overview: "",
      venue: "",
      location: "",
      date: "",
      time: "",
      mode: undefined,
      audience: "",
      organizer: "",
      tags: "",
      agenda: "",
      image: undefined,
    },
  });

  async function onSubmit(values: CreateEventValues) {
    try {
      const formData = new FormData();

      Object.entries(values).forEach(([key, value]) => {
        if (key === "tags" || key === "agenda") {
          const parsed = (value as string)
            .split("\n")
            .map((v) => v.trim())
            .filter(Boolean);
          formData.append(key, JSON.stringify(parsed));
        } else if (key === "image" && value) {
          formData.append("image", (value as FileList)[0]);
        } else if (value) {
          formData.append(key, value as string);
        }
      });

      const res = await fetch("/api/events", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error();

      toast.success("Event created successfully!");
      form.reset();
    } catch (err) {
      toast.error("Failed to create event");
      console.error(err);
    }
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Left side: Form */}
      <div className="w-full md:w-1/2 p-8 md:p-16 bg-black text-white">
        <h1 className="text-3xl font-bold mb-2">Create New Event</h1>
        <p className="text-gray-300 mb-8">
          Fill in the details below to publish a new event.
        </p>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
            encType="multipart/form-data"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Title */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="space-y-1 col-span-2">
                    <FormLabel>Event Title</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        onChange={(e) => field.onChange(e.target.value)}
                        className="bg-gray-900 text-white border-gray-700 h-11"
                        placeholder="Webstorm Webinars 3034"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Venue */}
              <FormField
                control={form.control}
                name="venue"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>Venue</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        onChange={(e) => field.onChange(e.target.value)}
                        className="bg-gray-900 text-white border-gray-700 h-11"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Location */}
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        onChange={(e) => field.onChange(e.target.value)}
                        className="bg-gray-900 text-white border-gray-700 h-11"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Date */}
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        {...field}
                        onChange={(e) => field.onChange(e.target.value)}
                        className="bg-gray-900 text-white border-gray-700 h-11"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Time */}
              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>Time</FormLabel>
                    <FormControl>
                      <Input
                        type="time"
                        {...field}
                        onChange={(e) => field.onChange(e.target.value)}
                        className="bg-gray-900 text-white border-gray-700 h-11"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Mode */}
              <FormField
                control={form.control}
                name="mode"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>Mode</FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(value)}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-gray-900 text-white border-gray-700 h-11">
                          <SelectValue placeholder="Select mode" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="offline">Offline</SelectItem>
                        <SelectItem value="online">Online</SelectItem>
                        <SelectItem value="hybrid">Hybrid</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Audience */}
              <FormField
                control={form.control}
                name="audience"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>Audience</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        onChange={(e) => field.onChange(e.target.value)}
                        className="bg-gray-900 text-white border-gray-700 h-11"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Organizer */}
              <FormField
                control={form.control}
                name="organizer"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>Organizer</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        onChange={(e) => field.onChange(e.target.value)}
                        className="bg-gray-900 text-white border-gray-700 h-11"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* File Input */}
            <FormItem className="space-y-1">
              <FormLabel>Event Image</FormLabel>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  form.setValue("image", e.target.files as unknown as FileList)
                }
                className="file:mr-4 file:rounded-md file:border-0 file:bg-gray-700 file:text-white file:px-4 file:py-2 bg-gray-900 text-white border-gray-700"
              />
              <FormMessage />
            </FormItem>

            {/* Full width textareas */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      onChange={(e) => field.onChange(e.target.value)}
                      className="bg-gray-900 text-white border-gray-700 min-h-[120px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="overview"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Overview</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      onChange={(e) => field.onChange(e.target.value)}
                      className="bg-gray-900 text-white border-gray-700 min-h-[120px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="agenda"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Agenda (one per line)</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      onChange={(e) => field.onChange(e.target.value)}
                      className="bg-gray-900 text-white border-gray-700 min-h-[120px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Tags (one per line)</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      onChange={(e) => field.onChange(e.target.value)}
                      className="bg-gray-900 text-white border-gray-700 min-h-[80px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full h-12 md:w-auto"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Creating..." : "Create Event"}
            </Button>
          </form>
        </Form>
      </div>

      {/* Right side: Gradient / Design */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-purple-700 via-pink-600 to-red-500">
        <div className="flex flex-col justify-center items-center w-full h-full p-8 text-white">
          <h2 className="text-4xl font-bold mb-4">Publish Your Event</h2>
          <p className="text-lg max-w-md text-center">
            Create a professional event page in seconds. Add all details, upload
            images, and get started with attendees.
          </p>
        </div>
      </div>
    </div>
  );
}
