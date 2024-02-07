
import { cloneElement, useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import { userService } from "../../services/authservices";

export function AdminUsers() {

  const [CollgesDetails, setCollgesDetails] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await userService.getcollegedata();
        setCollgesDetails(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  console.log("Showing the user page--", CollgesDetails);

  const handleSendEmail = async (id) => {
    console.log("Clickeddddd")
    try {
      const response = await userService.sendEmailForConfirmation(id);
      const data = await userService.getcollegedata();
        setCollgesDetails(data);
    } catch (error) {
      console.error(error);
    }
  };


  const handleBlockCollge = async (id)=>{
    try{
      const response = await userService.blockCollege(id);
      setCollgesDetails(response.data.data);
    }
    catch(error){
      console.log(error)
    }
  }


  return (
    <Layout>
      <section className="p-32">
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table
                  className="min-w-full border text-center text-sm font-light dark:border-neutral-500">
                  <thead className="border-b bg-indigo-950 text-white font-medium dark:border-neutral-500">
                    <tr>
                      <th
                        scope="col"
                        className="border-r px-6 py-4 dark:border-neutral-500">
                        No
                      </th>
                      <th
                        scope="col"
                        className="border-r px-6 py-4 dark:border-neutral-500">
                        College Name
                      </th>
                      <th
                        scope="col"
                        className="border-r px-6 py-4 dark:border-neutral-500">
                        State
                      </th>
                      <th
                        scope="col"
                        className="border-r px-6 py-4 dark:border-neutral-500">
                        Email
                      </th>
                      <th scope="col" className="border-r px-6 py-4 dark:border-neutral-500">Activation Status</th>
                      <th scope="col" className="border-r px-6 py-4 dark:border-neutral-500">Verification Status</th>
                      <th scope="col" className="border-r px-6 py-4 dark:border-neutral-500">Response mail Status</th>
                    </tr>
                  </thead>
                  <tbody>

                    {CollgesDetails.map((college, index) => (
                      <tr key={index} className="border-b dark:border-neutral-500">
                        <td className="whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500">
                          {index + 1}
                        </td>
                        <td className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
                          {college.collegename}
                        </td>
                        <td className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
                          {college.state}
                        </td>
                        <td className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
                          {college.email}
                        </td>
                        <td className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
                          {college.is_activate ? (<button onClick={() => handleBlockCollge(college.id)} className="bg-red-600 text-white rounded-lg font-extrabold h-8 w-28">Block</button>) 
                          : (<button onClick={() => handleBlockCollge(college.id)} className="bg-green-600 text-white rounded-lg font-extrabold h-8 w-28">Activate</button>)}
                        </td>
                        <td className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
                          cd
                        </td>
                        <td className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
                          {college.Verfication_email_status ? (
                            (<div className="bg-blue-600 text-white rounded-lg font-extrabold h-8 w-28">Updated</div>)
                          ) : (
                            <button className="bg-green-600 text-white rounded-lg font-extrabold h-8 w-28" onClick={() => handleSendEmail(college.id)}>Send Email</button>
                          )}
                        </td>

                      </tr>
                    ))}

                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

      </section>
    </Layout>
  );
}

