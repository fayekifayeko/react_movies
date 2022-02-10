import axios from "axios";
import Swal from "sweetalert2";
import { accountsApiUrl } from "../endpoints";
import { User } from "../models";
import { Button, IndexEntity } from "../shared";
import customConfirm from "../shared/customConfirm";

export default function Users() {

    async function makeAdmin(id: string){
        await doAdmin(`${accountsApiUrl}/makeAdmin`, id)
    }

    async function removeAdmin(id: string){
        await doAdmin(`${accountsApiUrl}/removeAdmin`, id)
    }

    async function doAdmin(url: string, id: string){
        await axios.post(url, JSON.stringify(id),
        {headers: {'Content-Type': 'application/json'}}
        );
        Swal.fire({
            title: 'Success',
            text: 'Operation finished correctly',
            icon: 'success'
        })
    }

    return (
        <IndexEntity<User> 
        apiUrl={`${accountsApiUrl}/listUsers`} 
        title="Users"
        entityName="users"
        >
            {users => 
                <>
                <thead>
                    <tr>
                        <th></th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(item => {
                        return(
                            <tr key={item.id}>
                                <td>
                                <Button onClick={() => customConfirm(()=> makeAdmin(item.id), `Do you wish to make ${item.email} as an Admin? Go it!`, "Do it")}>Make admin</Button>

                                    <Button className="btn btn-danger ms-2" onClick={() => customConfirm(()=> removeAdmin(item.id), `Do you wish to remove ${item.email} as an Admin? Go it!`, "Do it")}>Remove admin</Button>
                                </td>
                                <td>
                                    {item.email}
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
                </>
            

            }

        </IndexEntity>
    );
}