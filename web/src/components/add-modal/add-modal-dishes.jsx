import React, {useState} from "react";
import CustomSelect from "../custom-select/custom-select";
import {Toaster, toast} from "sonner";
import {BASE_URL} from "../../utilities/petitionConst.js";

const AddModalDishes = ({onClose}) => {
	const groupOptions = [
		{value: "1", label: "Entradas"},
		{value: "2", label: "Platos principales"},
		{value: "3", label: "Postres"},
		{value: "4", label: "Bebidas"},
		{value: "5", label: "Coctelería"},
		{value: "6", label: "Otros"},
	];

	const [clave, setClave] = useState("");
	const [dish, setDish] = useState("");
	const [group, setGroup] = useState(groupOptions[0].label);
	const [price, setPrice] = useState("");

	const handleSave = () => {
		if (!dish || !price || !group) {
			toast.error("Por favor, llena todos los campos");
			return;
		}

		if (isNaN(price)) {
			toast.error("El precio debe ser un número");
			return;
		}

		const newDish = {
			NombrePlatillo: dish,
			Precio: price,
			Grupo: group,
		};

		fetch(`${BASE_URL}/platillos`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newDish),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log("Nuevo platillo creado:", data);
				onClose(); // Cerrar el modal después de guardar exitosamente
			})
			.catch((error) => {
				console.error("Error al guardar el platillo:", error);
			});
	};

	const selectGroup = (option) => {
		setGroup(option.value);
	};

	return (
		<div className="modal-custom">
			<div onClick={onClose} className="overlay"></div>
			<div className="modal-custom-container">
				<div className="modal-custom-header">
					Agregar platillo
					<button onClick={onClose}>✖</button>
				</div>
				<div className="modal-custom-form-content">
					<div className="modal-custom-input">
						<span>Platillo</span>
						<input
							type="text"
							className="form-input"
							value={dish}
							onChange={(e) => setDish(e.target.value)}
						/>
					</div>
					<div className="modal-custom-input">
						<span>Precio</span>
						<input
							type="text"
							className="form-input"
							value={price}
							onChange={(e) => setPrice(e.target.value)}
						/>
					</div>
					<div className="modal-custom-input">
						<span>Grupo</span>
						<CustomSelect options={groupOptions} onOptionChange={selectGroup} />
					</div>
				</div>
				<div className="form-custom-button-container">
					<button className="form-custom-button" onClick={handleSave}>
						Guardar
					</button>
				</div>
			</div>
			<Toaster richColors closeButton />
		</div>
	);
};

export default AddModalDishes;
