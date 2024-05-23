import {useEffect, useState} from "react";
import {BASE_URL} from "../../utilities/petitionConst";
import CustomSelect from "../custom-select/custom-select";
import "./UpdateModal.css";

const UpdateModal = ({onClose, employeeID}) => {
	const [name, setName] = useState("");
	const [job, setJob] = useState("");
	const [jobID, setJobID] = useState(1);
	const [lastName, setLastName] = useState("");
	const [nss, setNss] = useState("");
	const [rfc, setRfc] = useState("");
	const [phone, setPhone] = useState("");
	const [address, setAddress] = useState("");
	const [email, setEmail] = useState("");

	const statusOptions = [
		{value: "1", label: "Chef"},
		{value: "2", label: "Camarero"},
		{value: "3", label: "Cajero"},
		{value: "4", label: "Cocinero"},
		{value: "5", label: "Gerente"},
	];

	useEffect(() => {
		getEmployee(employeeID);
	}, [employeeID]);

	const getEmployee = (employeeID) => {
		fetch(`${BASE_URL}/employees/${employeeID}`)
			.then((response) => response.json())
			.then((data) => {
				setName(data.NombreEmp);
				setJob(data.NombrePuesto);
				setJobID(data.IDPuesto);
				setLastName(data.ApellidosEmp);
				setNss(data.NSS);
				setRfc(data.RFC);
				setPhone(data.Telefono);
				setAddress(data.Direccion);
				setEmail(data.Email);
			})
			.catch((error) => {
				console.error("Error fetching employee:", error);
			});
	};

	const updateEmployee = () => {
		console.log("IDPuesto:", jobID);
		const updatedEmployee = {
			NombreEmp: name,
			IDPuesto: jobID,
			ApellidosEmp: lastName,
			NSS: nss,
			RFC: rfc,
			Telefono: phone,
			Direccion: address,
			Email: email,
		};

		fetch(`${BASE_URL}/employees/${employeeID}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updatedEmployee),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log("Employee updated successfully:", data);
				onClose();
			})
			.catch((error) => {
				console.error("Error updating employee:", error);
			});
	};

	const onCloseModal = () => {
		onClose();
	};

	const selectGroup = (option) => {
		setJob(option.label);
		setJobID(option.value);
		console.log(option);
	};

	return (
		<div className="modal">
			<div onClick={onCloseModal} className="overlay"></div>
			<div className="modal-container">
				<div className="modal-header">
					Editar empleado
					<button onClick={onCloseModal}>✖</button>
				</div>

				<div className="modal-form-content">
					<div className="container-inputs-emp">
						<div>
							<label htmlFor="name">Nombre</label>
							<input
								type="text"
								className="form-input"
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
						</div>
						<div>
							<label htmlFor="lastName">Apellidos</label>
							<input
								type="text"
								className="form-input"
								value={lastName}
								onChange={(e) => setLastName(e.target.value)}
							/>
						</div>
					</div>
					<div className="select">
						<label>Puesto</label>
						<CustomSelect
							options={statusOptions}
							onOptionChange={selectGroup}
							initialValue={job}
						/>
					</div>
					<div className="container-inputs-emp">
						<div>
							<label htmlFor="nss">NSS</label>
							<input
								type="text"
								className="form-input"
								value={nss}
								onChange={(e) => setNss(e.target.value)}
							/>
						</div>

						<div>
							<label htmlFor="rfc">RFC</label>
							<input
								type="text"
								className="form-input"
								value={rfc}
								onChange={(e) => setRfc(e.target.value)}
							/>
						</div>
					</div>
					<div className="container-inputs-emp">
						<div>
							<label htmlFor="phone">Teléfono</label>
							<input
								type="text"
								className="form-input"
								value={phone}
								onChange={(e) => setPhone(e.target.value)}
							/>
						</div>
						<div>
							<label htmlFor="address">Dirección</label>
							<input
								type="text"
								className="form-input"
								value={address}
								onChange={(e) => setAddress(e.target.value)}
							/>
						</div>
					</div>
					<label htmlFor="email">Email</label>
					<input
						type="text"
						className="form-input"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div className="form-button-container">
					<button
						type="submit"
						className="form-button"
						onClick={updateEmployee}
					>
						Actualizar empleado
					</button>
				</div>
			</div>
		</div>
	);
};

export default UpdateModal;
