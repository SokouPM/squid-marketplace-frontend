import { useRouter } from "next/router"
import Layout from "../../../../src/components/Layout"
import UserForm from "../../../../src/components/body/admin/UserForm"
import user from "../../../../src/datas/user"
import CircularProgress from "@mui/material/CircularProgress"

const ModifyUserPage = () => {
  const {
    query: { userId },
  } = useRouter()

  return (
    <Layout
      page="Administration / Modifier un utilisateur"
      fullwidth={1}
      diplayadminheader={1}
      diplayfooter={1}
    >
      {userId ? (
        <>
          <h2 className="my-5 text-3xl text-center font-bold">
            Modifier la categorie "{userId}"
          </h2>
          <UserForm user={user} />
        </>
      ) : (
        <div className="flex items-center justify-center mt-20">
          <CircularProgress
            sx={{
              color: "#cc0023",
            }}
          />
          <p className="ml-3">Chargement du formulaire...</p>
        </div>
      )}
    </Layout>
  )
}

export default ModifyUserPage