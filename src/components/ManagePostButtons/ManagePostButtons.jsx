'use client'
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

const ManagePostButtons = ({username, postId}) => {

  const {data} = useSession()
  const router = useRouter()

  const postDelete = async () => {

    const userConfirm = confirm("Está seguro que quer deletar este Post?")
    if (userConfirm) {
      try {
        const res = await fetch(`/api/posts/${postId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
        },
        });
        if (res.ok) {
            alert("O post foi deletado com sucesso")
            router.push("/")
          } else {
            alert("Erro ao deletar o post.");
          }
      } catch (err) {
        console.log(err);
        alert("Erro do lado de servidor.");
      } 
    }
  }

  //access to manage the post only for its author or Admin
  if (username === data?.user?.name || data?.user?.admin === true) {
    return (
      <div>
        <button onClick={() => router.push(`/edit/${postId}`)}>Editar</button> 
        <button onClick={postDelete}>Deletar</button>
      </div>
    )
  }  
}

export default ManagePostButtons