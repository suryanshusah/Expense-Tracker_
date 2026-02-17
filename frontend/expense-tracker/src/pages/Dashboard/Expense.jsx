import React ,{useState ,useEffect} from "react";
import { useUserAuth } from "../../hooks/useUserAuth";
import DashboardLayouts from "../../components/layouts/DashboardLayouts";
import { API_PATHS } from "../../utils/apiPaths";
import toast from "react-hot-toast";
import axiosInstance from "../../utils/axiosInstance";
import Modal from "../../components/Modal";
import ExpenseOverview from "../../components/Expense/ExpenseOverview";
import AddExpenseForm from "../../components/Expense/AddExpenseForm";
import ExpenseList from "../../components/Expense/ExpenseList";
import DeleteAlert from "../../components/DeleteAlert";

const Expense=()=>{
  useUserAuth();

    const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);
    const [expenseData, setExpenseData] = useState([]);
    const [loading ,setLoading] = useState(false);
    const [openDeleteAlert ,setOpenDeleteAlert] = useState({
      show:false,
      data:null,
    });

    //Get all Expense delails
  const fetchExpenseDetails = async () =>{
    if(loading) return;

    setLoading(true);

    try{
      const response = await axiosInstance.get(`${API_PATHS.EXPENSE.GET_ALL_EXPENSES}`);

      if(response.data){
        setExpenseData(response.data);
      }
    }catch(error){
      console.log("Something went wrong. Please try again." , error)
    } finally{
      setLoading(false);
    }
  };

  //Handle Add expense
  const handleAddExpense = async (expense) =>{
    const {category ,amount ,date,icon} = expense;

    //Validation Checks
    if(!category.trim()){
      toast.error("Category is required.");
      return;
    }

    if(!amount ||isNaN(amount) || Number(amount)<0){
      toast.error("Amount should be valid number")
      return;
    }
    if(!date){
      toast.error("Date is required.");
      return;
    }

    try{
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE ,{
        category,
        amount,
        date,
        icon
      }) ;
      setOpenAddExpenseModal(false);
      toast.success("Expense added sucessfully");
      fetchExpenseDetails();
    } catch(error){
      console.error(
        "Error while adding expense",
        error.response.data.message || error.message
      );
    }
  };

 //Delete Expense
 const deleteExpense = async (id) => {
  try {
    await axiosInstance.delete(
      API_PATHS.EXPENSE.DELETE_EXPENSE.replace(":id", id)
    );

    setOpenDeleteAlert({ show: false, data: null });
    toast.success("Expense details deleted successfully");
    fetchExpenseDetails();
  } catch (error) {
    console.error(
      "Error while deleting expense:",
      error?.response?.data?.message || error.message
    );
  }
};


  //Handle download expense detail
  const handleDownloadExpenseDetails = async ()=>{
    try {
      const response= await axiosInstance.get(API_PATHS.EXPENSE.DOWNLOAD_EXPENSE,
        {
          responseType:"blob"
        }
      );

      //Create a url for blob
      const url =window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download" ,"expense_details.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log("Error while downloading expense data: " , error);
      toast.error("Failed to download expense details. Please try again ")
    }
  };

   useEffect(()=>{
      fetchExpenseDetails();
  
      return ()=>{};
    } ,[]);

  return (
   <DashboardLayouts activeMenu="Expense">
      <div className="my-5 mx-auto">
        <div className="">
          <div className="">
            <ExpenseOverview
              transactions ={expenseData}
              onExpenseincome ={()=> setOpenAddExpenseModal(true)}
              />
          </div>
              <ExpenseList
               transactions={expenseData}
               onDelete={(id)=>{
                setOpenDeleteAlert({show :true , data:id});
               }}
               onDownload={handleDownloadExpenseDetails}
               />
        </div>

        <Modal
          isOpen={openAddExpenseModal}
          onClose={()=> setOpenAddExpenseModal(false)}
          title="Add Expense"
        >
          <AddExpenseForm onAddExpense={handleAddExpense}/>
        </Modal>

        <Modal 
          isOpen ={openDeleteAlert.show}
          onClose ={()=> setOpenDeleteAlert({show:false , data:null})}
          title ="Delete Expense"
        >
          <DeleteAlert
             content="Are you sure you want to delete this expense details?"
             onDelete={()=> deleteExpense(openDeleteAlert.data)}
          />
        </Modal>
      </div>
      </DashboardLayouts>
  )
}

export default Expense