"use client"

import { registerUser } from "@/app/actions/register"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"

const formSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    github: z.string().url("Must be a valid URL").startsWith("https://github.com/", "Must be a GitHub URL"),
    linkedin: z.string().url("Must be a valid URL").startsWith("https://linkedin.com/", "Must be a LinkedIn URL"),
    college: z.string().min(2, "College name must be at least 2 characters"),
    course: z.string().min(2, "Course name must be at least 2 characters"),
    year: z.string().regex(/^[1-5]$/, "Year must be between 1-5"),
    phone: z.string().regex(/^\+?[0-9]{10,12}$/, "Invalid phone number"),
    videoUrl: z.string().url("Must be a valid URL"),
    discord: z.string()
})

const FormComponent = () => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formStatus, setFormStatus] = useState<{
        type: 'success' | 'error' | null;
        message: string | null;
    }>({ type: null, message: null })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            github: "",
            linkedin: "",
            college: "",
            course: "",
            year: "",
            phone: "",
            videoUrl: "",
            discord: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setIsSubmitting(true)
            setFormStatus({ type: null, message: null })

            const result = await registerUser(values)

            if (result.success) {
                setFormStatus({
                    type: 'success',
                    message: '✨ Registration successful! Will Ping You Soon...'
                })
                form.reset()
            } else {
                setFormStatus({
                    type: 'error',
                    message: result.error || 'Something went wrong. Please try again.'
                })
            }
        } catch {
            setFormStatus({
                type: 'error',
                message: 'Failed to submit form. Please check your connection and try again.'
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4">
            <motion.div
                className="w-full max-w-4xl relative z-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <Card className="relative bg-black/80 border-white/10 shadow-2xl overflow-hidden">
                    {/* Background Effects */}
                    <div className="absolute inset-0 z-0">
                        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-black/50 to-black/80" />
                        <motion.div
                            className="absolute inset-0"
                            animate={{
                                background: [
                                    "radial-gradient(600px circle at 0% 0%, rgba(124, 58, 237, 0.1), transparent 40%)",
                                    "radial-gradient(600px circle at 100% 100%, rgba(59, 130, 246, 0.1), transparent 40%)",
                                    "radial-gradient(600px circle at 0% 0%, rgba(124, 58, 237, 0.1), transparent 40%)",
                                ],
                            }}
                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        />
                    </div>

                    <CardHeader className="relative z-10 pt-8 pb-4">
                        <motion.div
                            className="text-center space-y-2"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="mb-2">
                                <motion.div
                                    className="w-20 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full"
                                    animate={{ scaleX: [1, 1.5, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                />
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
                                Registration Form
                            </h2>
                            <p className="text-gray-400 text-lg">
                                Start your journey with us
                            </p>
                        </motion.div>
                    </CardHeader>

                    <CardContent className="relative z-10 px-6 pb-8">
                        <AnimatePresence mode="wait">
                            {formStatus.type && (
                                <motion.div
                                    key={formStatus.type}
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className={`mb-6 p-4 rounded-lg ${formStatus.type === 'success'
                                        ? 'bg-green-500/10 border border-green-500/20 text-green-400'
                                        : 'bg-red-500/10 border border-red-500/20 text-red-400'
                                        }`}
                                >
                                    {formStatus.message}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {[
                                        { name: "name", label: "Full Name", placeholder: "John Doe" },
                                        { name: "email", label: "Email", placeholder: "you@example.com", type: "email" },
                                        { name: "github", label: "GitHub Profile", placeholder: "https://github.com/username" },
                                        { name: "linkedin", label: "LinkedIn Profile", placeholder: "https://linkedin.com/in/username" },
                                        { name: "college", label: "College Name", placeholder: "Your College" },
                                        { name: "course", label: "Course", placeholder: "Your Course" },
                                        { name: "year", label: "Year", placeholder: "1-5" },
                                        { name: "phone", label: "Phone Number", placeholder: "+91XXXXXXXXXX" },
                                        { name: "videoUrl", label: "Video URL", placeholder: "https://youtube.com/..." },
                                        { name: "discord", label: "Discord ID", placeholder: "username#1234" }
                                    ].map((field, index) => (
                                        <FormField
                                            key={field.name}
                                            control={form.control}
                                            name={field.name as keyof z.infer<typeof formSchema>}
                                            render={({ field: formField }) => (
                                                <motion.div
                                                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                                                    whileInView={{ opacity: 1, x: 0 }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                                >
                                                    <FormItem className="relative group">
                                                        <FormLabel className="text-gray-200 font-medium pl-1">
                                                            {field.label}
                                                        </FormLabel>
                                                        <FormControl>
                                                            <div className="relative">
                                                                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-500 blur group-hover:blur-md" />
                                                                <Input
                                                                    placeholder={field.placeholder}
                                                                    type={field.type}
                                                                    disabled={isSubmitting}
                                                                    {...formField}
                                                                    className="relative bg-black border-white/10 text-white
                                                                    placeholder:text-gray-500 group-hover:border-purple-500/50
                                                                    focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20
                                                                    transition-all duration-300 transform-gpu"
                                                                />
                                                            </div>
                                                        </FormControl>
                                                        <FormMessage className="text-red-400 pl-1 text-sm mt-1" />
                                                    </FormItem>
                                                </motion.div>
                                            )}
                                        />
                                    ))}
                                </div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.5 }}
                                    className="pt-4"
                                >
                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className={`w-full h-14 bg-gradient-to-r from-purple-500 to-blue-500
                                        hover:from-purple-600 hover:to-blue-600 text-white font-semibold text-lg
                                        transition-all duration-300 transform-gpu hover:scale-[1.02] hover:shadow-lg
                                        hover:shadow-purple-500/25 rounded-lg relative overflow-hidden group
                                        disabled:opacity-70 disabled:cursor-not-allowed`}
                                    >
                                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        {isSubmitting ? (
                                            <div className="flex items-center justify-center gap-2">
                                                <motion.div
                                                    animate={{ rotate: 360 }}
                                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                    className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full"
                                                />
                                                <span>Submitting...</span>
                                            </div>
                                        ) : (
                                            "Submit Registration"
                                        )}
                                    </Button>
                                </motion.div>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    )
}

export default FormComponent
