import { Header } from "@/components/header"
import { useParams } from "react-router-dom";

export default function AddTransaction(){
    const { policyId } = useParams<{ policyId: string }>();

    return(
        <div>
            <Header/>
            <h1>Add Transaction for Policy ID: {policyId}</h1>
        </div>
    )
}
