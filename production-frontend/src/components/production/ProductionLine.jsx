import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { simulateProductionline } from "./productionlineSlice";


const ProductionLine = ({ pl, number }) => {

    const dispatch = useDispatch();
    const [carModel, setModel] = useState();
    const models = useSelector(state => state.ressources.carModels)
    
    const startSimulation = (pl, speed) => {
        let newMod = models.find(mod => mod.id == carModel)
        let modLine = {...pl, carModel: newMod}
        dispatch(simulateProductionline({simSpeed: speed, modLine}))
    }

    return (
        <tr>
            <th scope="row">{number + 1}</th>
            <td>{pl.name == null ? "Linienname" : pl.name}</td>
            <td>
                <select className="form-select" onChange={e => setModel(e.target.value)} disabled={pl.active}>
                    {models.map((mod, i) => <option key={i} value={mod.id} selected={pl.carModel.name == mod.name ? "selected" : ""}>{mod.name}</option>)}    
                </select>
               
                {/* {pl.name == null ? "Fahrzeug" : pl.carModel.name} */}
            </td>
            <td>{pl.runnable ? "lauffähig" : "unvollständig"}</td>
            <td>{pl.active ? "läuft" : "läuft nicht"} </td>
            <td><i className="bi bi-play iconhover" onClick={() => startSimulation(pl, 10)}></i><i className="bi bi-stop iconhover"></i><i className="bi bi-info-square iconhover"></i></td>
        </tr>
    )

}

export default ProductionLine