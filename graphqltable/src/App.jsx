
import { CountryTable } from './CountryTable';
import CountryDataPieChart from './components/layouts/CountryDataPieChart';
const App = () => {

  return (
 <>
 {/* <div className='w-full h-40 bg-red-100'>

 </div> */}
 <CountryTable />
 {/* <div className='flex flex-col justify-center items-center my-10 px-5 lg:px-10 md:px-10'>

<div class="flex w-full">
  <div class="w-2/3 pr-2">
  <h6 className='pb-5 font-semibold text-lg'>World Exploration</h6>
  <CountryTable />
  </div>
  <div class="w-1/3"> 
    <div class="h-full">
    <h6 className='pb-10 font-semibold text-lg text-center'>World Chart</h6>
    <div className='mt-10'>
    <CountryDataPieChart />
    </div>
   
    </div> 
  </div>
</div>
 </div> */}
 </>
  );
};

export default App;
