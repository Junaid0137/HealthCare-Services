'use client';
import React, { FormEvent, useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { motion } from "framer-motion"
import { Input } from "./ui/input";
import { ChevronUpCircleIcon } from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "sonner"

function HomePage() {
    const [services, setServices] = useState([
        { id: 1, name: 'General Checkup', description: 'Routine health checkup', price: 50 },
    ]);

    const [formData, setFormData] = useState({ name: '', description: '', price: '' });

    const [editServiceId, setEditServiceId] = useState(null);

    const handleInputChange = (e: FormEvent) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleAddService = (e: FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.description || !formData.price) {
            alert('All fields are required!');
            return;
        }

        if (editServiceId) {
            // Update existing service
            setServices((prev) =>
                prev.map((service) =>
                    service.id === editServiceId
                        ? { ...service, ...formData, price: parseFloat(formData.price) }
                        : service
                )
            );
            setEditServiceId(null);
            seteIsOpen(false);
            toast.success('Service Updated')
        } else {
            // Add new service
            const newService = {
                id: services.length + 1,
                ...formData,
                price: parseFloat(formData.price),
            };
            setServices((prev) => [...prev, newService]);
            toast.success('Added new service')
        }
        setFormData({ name: '', description: '', price: '' });
    };


    const [aIsOpen, setAIsOpen] = useState(false);


    const handleEditService = (id: number) => {
        const serviceToEdit = services.find((service) => service.id === id);
        setFormData({ ...serviceToEdit });
        setEditServiceId(id);
    };

    const handleDeleteService = (id: number) => {
        setServices((prev) => prev.filter((service) => service.id !== id));
        setIsOpen(false)
        toast.success('Service Deleted')
    };

    const [isOpen, setIsOpen] = useState(false);

    const [eisOpen, seteIsOpen] = useState(false);

    return <div className="flex flex-col">
        <section>
            <div className="h-screen mx-auto max-w-7xl bg-[#EEEDE7] flex flex-col justify-center -mt-10">
                <motion.div
                    initial={{ opacity: 0, y: -100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 2 }}
                    className="space-y-10">
                    <h1 className="text-5xl tracking-[10px] uppercase text-center text-gray-500 from-accent-foreground">Welcom to</h1>
                    <h1 className="text-7xl font-bold tracking-[20px] uppercase text-center">Healthcare Services</h1>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 2 }}
                    className="mt-20 flex justify-center space-x-4">
                    <div>
                        <Dialog open={aIsOpen} onOpenChange={setAIsOpen}>
                            <DialogTrigger>
                                <Button className="text-lg px-20 py-10 rounded-full">
                                    Add New Service
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Add New Service</DialogTitle>
                                </DialogHeader>
                                <form onSubmit={handleAddService} className="space-y-2">
                                    <Input
                                        type="text"
                                        name="name"
                                        placeholder="Service Name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                    />
                                    <Input
                                        type="text"
                                        name="description"
                                        placeholder="Description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                    />
                                    <Input
                                        type="number"
                                        name="price"
                                        placeholder="Price"
                                        value={formData.price}
                                        onChange={handleInputChange}
                                    />
                                    <Button onClick={() => {
                                        setAIsOpen(false);
                                    }} type="submit" className="w-full">
                                        {editServiceId ? 'Update' : 'Add'} Service
                                    </Button>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>
                    <Link href={'#service'}>
                        <Button className="text-lg px-20 py-10 rounded-full">View Services</Button>
                    </Link>
                </motion.div>
            </div>
        </section>
        <section id="service">
            <div className="h-screen bg-gray-100 p-8 flex flex-col justify-center flex-grow">
                <h1 className="text-3xl font-bold text-center mb-6 -mt-20">Healthcare Services</h1>
                <div className="">
                    <div className="mt-8 grid grid-cols-3 gap-5 max-w-6xl mx-auto">
                        {services.map((service) => (
                            <Card key={service.id} className="shadow-lg">
                                <CardHeader>
                                    <CardTitle>{service.name}</CardTitle>
                                    <CardDescription>{service.description}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p>₹{service.price}</p>
                                    <div className="mt-4 space-x-2 flex flex-row">
                                        <div>
                                            <Dialog open={eisOpen} onOpenChange={seteIsOpen}>
                                                <Button onClick={() => handleEditService(service.id)} asChild>
                                                    <DialogTrigger>Edit</DialogTrigger>
                                                </Button>
                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle>Edit Service</DialogTitle>
                                                    </DialogHeader>
                                                    <Input
                                                        type="text"
                                                        name="name"
                                                        placeholder="Service Name"
                                                        value={formData.name}
                                                        onChange={handleInputChange}
                                                    />
                                                    <Input
                                                        type="text"
                                                        name="description"
                                                        placeholder="Description"
                                                        value={formData.description}
                                                        onChange={handleInputChange}
                                                    />
                                                    <Input
                                                        type="number"
                                                        name="price"
                                                        placeholder="Price"
                                                        value={formData.price}
                                                        onChange={handleInputChange}
                                                    />
                                                    <DialogFooter>
                                                        <DialogClose asChild>
                                                            <Button type="button" variant='secondary'>
                                                                Close
                                                            </Button>
                                                        </DialogClose>
                                                        <Button onClick={handleAddService}>Save Changes</Button>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>
                                        </div>
                                        <div>
                                            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                                                <Button asChild variant='destructive'>
                                                    <DialogTrigger>Delete</DialogTrigger>
                                                </Button>
                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                                                        <DialogDescription>
                                                            This action cannot be undone. This will permanently delete your account
                                                            and remove your data from our servers.
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <DialogFooter>
                                                        <Button
                                                            type='button'
                                                            variant='destructive'
                                                            onClick={() => handleDeleteService(service.id)}
                                                        >
                                                            Delete
                                                        </Button>
                                                        <DialogClose asChild>
                                                            <Button type="button" variant='secondary'>
                                                                Close
                                                            </Button>
                                                        </DialogClose>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
                <div className="relatiev mb-10 mt-10 flex flex-row justify-center mx-auto animate-bounce">
                    <Link href={'/'}>
                        <ChevronUpCircleIcon size={30} />
                    </Link>
                </div>
            </div>
        </section>
    </div >
}

export default HomePage;
