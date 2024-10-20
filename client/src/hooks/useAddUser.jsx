import { useMutation } from "@tanstack/react-query";
// import { useState } from "react";
// import { toast } from 'react-hot-toast';
import { addUser } from "../api/users";

const useAddUser = () => {
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(null);

//   const addUser = async (values) => {
//     if (values.password !== values.passwordConf) {
//         return setError("Password do not match!")
//     }

//   };

const createMutation = useMutation({
    mutationFn: addUser
})

  return { createMutation };
};

export default useAddUser;
