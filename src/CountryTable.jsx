import React,{useState,useEffect,useRef} from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown,ArrowUpDown,Settings2,MoreHorizontal,Download, Import } from "lucide-react";
import { useQuery, gql } from "@apollo/client";
import { Button } from "./components/ui/button";
import { Checkbox } from "@/components/ui/checkbox"
import { exportTableToCSV } from "./lib/export";
import { ViewCountryDetails } from "./components/layouts/ViewCountryDetails";
import { GET_ALL_LAN, GET_COUNTRIES } from "./components/gqlOperation/queries";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectLabel,
  SelectValue,
} from "@/components/ui/select"
import CustomSelect from "./components/layouts/CustomSelect";
import CountryDataPieChart from "./components/layouts/CountryDataPieChart";
export function CountryTableContent({dataLang, data }) {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([])
  const [columnVisibility, setColumnVisibility] =useState({})
const [rowSelection, setRowSelection] = useState({})
  const [pageIndex, setPageIndex] = useState(0);
  const [selectedData,setSelectedData] =useState()
  const [showUpdateTaskSheet, setShowUpdateTaskSheet] =useState(false)
  const [selectedContinent, setSelectedContinent] = useState("");
  const [selectedLag,setSelectedLag] =useState("");
  const [selectedValue, setSelectedValue] = useState(null);
  console.log("page index is",dataLang)
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleMouseClick = (event) => {
      // Close the menu if the click occurs outside of the menu content
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    // Attach the event listener when the menu is open
    if (isOpen) {
      window.addEventListener('click', handleMouseClick);
    }

    return () => {
      // Detach the event listener when the component unmounts or the menu closes
      window.removeEventListener('click', handleMouseClick);
    };
  }, [isOpen]);
  const handleRowClick = (rowData) => {
    setSelectedData(rowData)
    setShowUpdateTaskSheet(true)
  };

  const columns = [
    // {
    //     id: "select",
    //     header: ({ table }) => (
    //       <Checkbox
    //         checked={
    //           table.getIsAllPageRowsSelected() ||
    //           (table.getIsSomePageRowsSelected() && "indeterminate")
    //         }
    //         onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
    //         aria-label="Select all"
    //       />
    //     ),
    //     cell: ({ row }) => (
    //       <Checkbox
    //         checked={row.getIsSelected()}
    //         onCheckedChange={(value) => row.toggleSelected(!!value)}
    //         aria-label="Select row"
    //       />
    //     ),
    //     enableSorting: false,
    //     enableHiding: false,
    //   },
    {
      accessorKey: "code",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Code
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div className="">{row.getValue("code")}</div>,
    },
    {
        accessorKey: "emoji",
        header: "Flag",
        cell: ({ row }) => <div>{row.getValue("emoji")}</div>,
      },
      {
        accessorKey: "phone",
        header: "ISD",
        cell: ({ row }) => <div>{row.getValue("phone")}</div>,
      },
    // {
    //   accessorKey: "name",
    //   header: ({ column }) => (
    //     <Button
    //       variant="ghost"
    //       onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    //     >
    //       Country Name
    //       <ArrowUpDown className="ml-2 h-4 w-4" />
    //     </Button>
    //   ),
    //   cell: ({ row }) => <div className="">{row.getValue("name")}</div>,
    // },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Country Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="">
          <span  className="text-blue-500 hover:underline cursor-pointer">
            {row.getValue("name")}
          </span>
        </div>
      ),
    },
    
    // {
    //   accessorKey: "native",
    //   header: "Native",
    //   cell: ({ row }) => <div>{row.getValue("native")}</div>,
    // },
   
    {
      accessorKey: "continent.name",
      header: "Continent",
      cell: ({ row }) => <div>{row.original.continent?.name ?? ""}</div>,
    },
    {
      accessorKey: "languages",
      header: "Languages",
      cell: ({ row }) => (
        <div>
          {row
            .getValue("languages")
            .map((lang) => lang.name)
            .join(", ")}
        </div>
      ),
    },
    // {
    //   id: "actions",
    //   header: "Actions",
    //   enableHiding: false,
    //   cell: ({ row }) => {
    //     const country = row.original
   
    //     return (
    //       <>
    //       <ViewCountryDetails
    //             open={showUpdateTaskSheet}
    //             onOpenChange={setShowUpdateTaskSheet}
    //             task={row.original}
    //           />
    //            <DropdownMenu>
    //         <DropdownMenuTrigger asChild>
    //           <Button variant="ghost" className="h-8 w-8 p-0">
    //             <span className="sr-only">Open menu</span>
    //             <MoreHorizontal className="h-4 w-4" />
    //           </Button>
    //         </DropdownMenuTrigger>
    //         <DropdownMenuContent align="end">
    //           <DropdownMenuLabel>Actions</DropdownMenuLabel>
    //           <DropdownMenuItem
    //             onClick={() => navigator.clipboard.writeText(country.name)}
    //           >
    //             Copy Country Name
    //           </DropdownMenuItem>
    //           <DropdownMenuSeparator />
    //           <DropdownMenuItem onSelect={() => setShowUpdateTaskSheet(true)}>View Country Details</DropdownMenuItem>
    //           {/* <DropdownMenuItem>View payment details</DropdownMenuItem> */}
    //         </DropdownMenuContent>
    //       </DropdownMenu>
    //       </>
         
    //     )
    //   },
    // }
  ];

  // const dataRows = data.countries.map((country) => ({
  //   ...country,
  //   id: country.code,
  // }));
  const options = [
    { label: 'All Continents', value: '' },
    { label: 'North America', value: 'North America' },
    { label: 'South America', value: 'South America' },
    { label: 'Europe', value: 'Europe' },
    { label: 'Africa', value: 'Africa' },
    { label: 'Asia', value: 'Asia' },
    { label: 'Oceania', value: 'Oceania' },
    { label: 'Antarctica', value: 'Antarctica' },
  ];
  // const options12 = [
  //   { label: 'All Languages', value: '' },
  //   { label: 'English', value: 'English' },
  //   { label: 'Hindi', value: 'Hindi' },
  //   { label: 'French', value: 'French' },
  //   { label: 'Russian', value: 'Russian' },
  //   { label: 'Spanish', value: 'Spanish' },
  //   { label: 'German', value: 'German' },
  //   { label: 'Peul', value: 'Peul' },
  //   { label: 'Arabic', value: 'Arabic' },
  //   { label: 'Italian', value: 'Italian' },
  //   { label: 'Chinese', value: 'Chinese' },
  //   { label: 'Greek', value: 'Greek' },
  //   { label: 'Turkish', value: 'Turkish' },
  //   { label: 'Korean', value: 'Korean' },

  // ]

const uniqueLanguages = new Set();

dataLang?.countries?.forEach(country => {
  country.languages.forEach(language => {
    uniqueLanguages.add(language.name);
  });
});

const options12 = [
  { label: 'All Languages', value: '' },
  ...Array.from(uniqueLanguages).map(language => ({ label: language, value: language }))
];

console.log(options12);
  const dataRows = data.countries
  .filter((country) =>
    selectedContinent ? country.continent.name === selectedContinent : true
  )
  .filter((country) =>
    selectedLag ? country.languages.some(lang => lang.name === selectedLag) : true
  )
  .map((country) => ({
    ...country,
    id: country.code,
  }));

    useEffect(() => {
      localStorage.setItem('countriesData', JSON.stringify(dataRows));
    
    }, [dataRows]);
  
  const table = useReactTable({
    data: dataRows,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getPaginationRowModel: getPaginationRowModel(),
    // getPaginationRowModel: getPaginationRowModel({ pageIndex }),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      // pageIndex,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    initialState: { 
      pagination: {
          pageSize: 250,
      },
    }
  });
  const handleContinentChange = (continent) => {
    setSelectedContinent(continent);
    
  };
  const handleLanguageChange = (lng) => {
    setSelectedLag(lng)
  }

  return (
    <>
    {/* <div className='w-full h-20 bg-red-100'>
      <img  className="w-full h-20" src="/mapbanner.jpeg" alt="map banner" />
      </div>  */}
<div className='flex flex-col justify-center items-center my-10 px-5 lg:px-5 md:px-10'>

<div class="relative flex flex-col md:flex-row w-full">
 <div class="w-full md:w-2/3 pr-0 md:pr-2 mb-5 md:mb-0">
  <h6 className='pb-5 font-semibold text-lg'>World Exploration</h6>
  <div className="w-full">
      <div className="flex justify-between items-center gap-4 py-4">
        <Input
          placeholder="Search by country code..."
          value={table.getColumn("code")?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn("code")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <div className="hidden md:flex flex-row gap-2">
            <CustomSelect placeholder="Select a Continent" value={selectedContinent} options={options} onChange={handleContinentChange} />
            <CustomSelect placeholder="Select a Languages" value={selectedLag} options={options12} onChange={handleLanguageChange} />
          </div>
          <div className="block md:hidden lg:hidden">
          <DropdownMenu >
  <DropdownMenuTrigger asChild>
    <Button variant="outline" className="ml-auto">
      Filter by<Settings2 className="ml-2 h-4 w-4" />
    </Button>
  </DropdownMenuTrigger>
  <div className="lg:hidden"> 
    <DropdownMenuContent ref={menuRef} isOpen={isOpen} className="py-2 px-2 flex flex-col gap-1" align="end">
      <div className="flex flex-row gap-2">
        <CustomSelect placeholder="Select a Continent" value={selectedContinent} options={options} onChange={handleContinentChange} />
        <CustomSelect placeholder="Select a Languages" value={selectedLag} options={options12} onChange={handleLanguageChange} />
      </div>
    </DropdownMenuContent>
  </div>
</DropdownMenu>
          </div>


   
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  onSelect={() =>  setShowUpdateTaskSheet(true)}
                  onClick={() => handleRowClick(row?.original)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
     

    </div>
  </div>
  <div class="w-full md:fixed lg:fixed relative lg:top-10 lg:right-0 lg:w-1/3 md:w-1/3"> 
    <div class="h-full">
    <h6 className='pb-10 font-semibold text-lg text-center'>World Chart</h6>
    <div className='mt-5'>
     <h5 className="text-center text-semibold text-lg pb-5"> {selectedContinent ? `${selectedContinent} (${dataRows?.length} Countries)`: `${dataRows?.length} Countries` }</h5> 
    <CountryDataPieChart />
    </div>
    </div> 
  </div>
</div>
 </div>
    <ViewCountryDetails
        open={showUpdateTaskSheet}
        onOpenChange={setShowUpdateTaskSheet}
        task={selectedData}
      />      
    </>
   
  );
}

export function CountryTable() {
  const { loading, error, data } = useQuery(GET_COUNTRIES);
  const {data:dataLang} = useQuery(GET_ALL_LAN);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return <CountryTableContent dataLang ={dataLang} data={data} />;
}
