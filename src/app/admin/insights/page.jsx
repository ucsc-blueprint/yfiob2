import AdminNavbar from "../../../components/AdminNavbar/AdminNavbar";

export default function AdminInsights() {
  return (
    <>
    <AdminNavbar />
    <div className="min-h-screen flex flex-col overflow-hidden">
      <div className="flex-grow flex items-center justify-center">
        <div className="w-[502px] space-y-6">
          <h1 className="text-4xl font-lato font-bold text-[40px] leading-[40px] tracking-normal mb-8">
            Insights
          </h1>
          <p>How many users are active on the site?</p>
          

          {/* <h1>{assessmentsTaken}</h1>  */}
          <p>
          assessments taken
          </p>
        </div>
      </div>
    </div>
    </>
  );
}