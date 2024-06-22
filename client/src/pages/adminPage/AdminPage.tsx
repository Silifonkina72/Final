import AcrylicPrimersList from "../../components/Exist/Exist";
import AdminTable from "../../components/Table/Table";

export default function AdminPage() {
  return (
    <>
      <div className="contener">
        <div>Остаток :</div>
        {/* <AcrylicPrimersList /> */}
        <AdminTable />
      </div>
    </>
  );
}
