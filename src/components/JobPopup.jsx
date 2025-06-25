"use client";

import React, { useState, useEffect } from "react";

const JobPopup = ({ isOpen, onClose, onSubmit, openRef, jobToEdit }) => {
	const [formData, setFormData] = useState({
		name: "",
		description: "",
		experience: "",
		salary: "",
		industry: "",
		photos: [],
	});

	useEffect(() => {
		if (isOpen) {
			if (jobToEdit) {
				setFormData({
					name: jobToEdit.name || "",
					description: jobToEdit.description || "",
					experience: jobToEdit.experienceRequired || "",
					salary: jobToEdit.salary || "",
					industry: jobToEdit.industry || "",
					photos: jobToEdit.photos || [],
				});
			} else {
				setFormData({
					name: "",
					description: "",
					experience: "",
					salary: "",
					industry: openRef.current || "",
					photos: [],
				});
			}
		}
	}, [isOpen, jobToEdit, openRef]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handlePhotoChange = (e) => {
		const files = Array.from(e.target.files);
		setFormData((prev) => ({
			...prev,
			photos: files,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit(formData);
		onClose();
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
			<div className="bg-white rounded-lg p-6 w-full max-w-xl relative">
				<button
					className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
					onClick={onClose}
				>
					×
				</button>
				<h2 className="text-xl font-bold mb-4">Job</h2>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="form-group">
						<label htmlFor="name" className="block text-sm font-medium text-gray-700">
							Title:
						</label>
						<input
							type="text"
							id="name"
							name="name"
							value={formData.name}
							onChange={handleChange}
							required
							className="mt-1 py-2 block w-full rounded-md bg-[#F0F0F0] border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
						/>
					</div>

					<div className="form-group">
						<label
							htmlFor="description"
							className="block text-sm font-medium text-gray-700"
						>
							Description:
						</label>
						<textarea
							id="description"
							name="description"
							value={formData.description}
							onChange={handleChange}
							required
							className="mt-1 block w-full rounded-md bg-[#F0F0F0] border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
						/>
					</div>

					<div className="form-group">
						<label
							htmlFor="experience"
							className="block text-sm font-medium text-gray-700"
						>
							Experience Required:
						</label>
						<textarea
							type="text"
							id="experience"
							name="experience"
							value={formData.experience}
							onChange={handleChange}
							required
							className="mt-1 py-2 block w-full rounded-md bg-[#F0F0F0] border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
						/>
					</div>

					<div className="form-group">
						<label
							htmlFor="salary"
							className="block text-sm font-medium text-gray-700"
						>
							Salary:
						</label>
						<textarea
							type="text"
							id="salary"
							name="salary"
							value={formData.salary}
							onChange={handleChange}
							required
							className="mt-1 py-2 block w-full rounded-md bg-[#F0F0F0] border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
						/>
					</div>

					<div className="form-group">
						<label
							htmlFor="industry"
							className="block text-sm font-medium text-gray-700"
						>
							Industry:
						</label>
						<input
							type="text"
							id="industry"
							name="industry"
							value={formData.industry}
							onChange={handleChange}
							required
							className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
						/>
					</div>

					<div className="form-group">
						<label
							htmlFor="photos"
							className="block text-sm font-medium text-gray-700"
						>
							Photos:
						</label>
						<input
							type="file"
							id="photos"
							name="photos"
							onChange={handlePhotoChange}
							multiple
							accept="image/*"
							className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
						/>
					</div>

					<div className="flex justify-end space-x-3 mt-6">
						<button
							type="button"
							className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
							onClick={onClose}
						>
							Cancel
						</button>
						<button
							type="submit"
							className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
						>
							Submit
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default JobPopup;
