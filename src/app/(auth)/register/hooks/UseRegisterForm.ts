import { UserRegisterDefaultvalues } from "@/app/admin/AdminDefaultValues"
import { RegisterInput, RegisterSchema } from "@/app/admin/AdminSchemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

export const UseRegisterForm=()=> {
    const methods = useForm({defaultValues: UserRegisterDefaultvalues,
        resolver: zodResolver(RegisterSchema),
        mode: "onChange"
    })
    const onSubmit=(data: RegisterInput) => {
        console.log(data)
    }
    return{
        methods,
        onSubmit: methods.handleSubmit(onSubmit),
        reset: methods.reset
    }
}