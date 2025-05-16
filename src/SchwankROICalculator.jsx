
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuContent } from "@/components/ui/dropdown-menu";

const heaters = [
  { name: "Phantom 115,000 BTU", btu: 115000, coverage: 144, cost: 5000 },
  { name: "Phantom 80,000 BTU", btu: 80000, coverage: 110, cost: 3500 },
  { name: "Phantom 50,000 BTU", btu: 50000, coverage: 80, cost: 3500 },
  { name: "Supreme 50,000 BTU (2-stage)", btu: 50000, coverage: 80, cost: 3500 },
  { name: "Supreme 35,000 BTU (single-stage)", btu: 35000, coverage: 60, cost: 3500 }
];

const cityData = [
  {
    "name": "New York",
    "monthsGained": 2.6,
    "link": "https://ashrae-meteo.info/v2.0/index.php?lat=40.71&lng=-74.01"
  },
  {
    "name": "Los Angeles",
    "monthsGained": 2.2,
    "link": "https://ashrae-meteo.info/v2.0/index.php?lat=34.05&lng=-118.24"
  },
  {
    "name": "Chicago",
    "monthsGained": 2.4,
    "link": "https://ashrae-meteo.info/v2.0/index.php?lat=41.88&lng=-87.63"
  },
  {
    "name": "Toronto",
    "monthsGained": 3.7,
    "link": "https://ashrae-meteo.info/v2.0/index.php?lat=43.65&lng=-79.38"
  },
  {
    "name": "Vancouver",
    "monthsGained": 3.8,
    "link": "https://ashrae-meteo.info/v2.0/index.php?lat=49.28&lng=-123.12"
  },
  {
    "name": "Montreal",
    "monthsGained": 3.1,
    "link": "https://ashrae-meteo.info/v2.0/index.php?lat=45.5&lng=-73.57"
  },
  {
    "name": "Calgary",
    "monthsGained": 2.3,
    "link": "https://ashrae-meteo.info/v2.0/index.php?lat=51.05&lng=-114.07"
  },
  {
    "name": "Ottawa",
    "monthsGained": 3.1,
    "link": "https://ashrae-meteo.info/v2.0/index.php?lat=45.42&lng=-75.69"
  },
  {
    "name": "Houston",
    "monthsGained": 2.0,
    "link": "https://ashrae-meteo.info/v2.0/index.php?lat=29.76&lng=-95.37"
  },
  {
    "name": "Phoenix",
    "monthsGained": 2.0,
    "link": "https://ashrae-meteo.info/v2.0/index.php?lat=33.45&lng=-112.07"
  },
  {
    "name": "Philadelphia",
    "monthsGained": 2.9,
    "link": "https://ashrae-meteo.info/v2.0/index.php?lat=39.95&lng=-75.17"
  },
  {
    "name": "San Antonio",
    "monthsGained": 2.5,
    "link": "https://ashrae-meteo.info/v2.0/index.php?lat=29.42&lng=-98.49"
  },
  {
    "name": "San Diego",
    "monthsGained": 2.6,
    "link": "https://ashrae-meteo.info/v2.0/index.php?lat=32.72&lng=-117.16"
  },
  {
    "name": "Dallas",
    "monthsGained": 2.8,
    "link": "https://ashrae-meteo.info/v2.0/index.php?lat=32.78&lng=-96.8"
  },
  {
    "name": "San Jose",
    "monthsGained": 3.1,
    "link": "https://ashrae-meteo.info/v2.0/index.php?lat=37.34&lng=-121.89"
  },
  {
    "name": "Austin",
    "monthsGained": 2.7,
    "link": "https://ashrae-meteo.info/v2.0/index.php?lat=30.27&lng=-97.74"
  },
  {
    "name": "Jacksonville",
    "monthsGained": 3.6,
    "link": "https://ashrae-meteo.info/v2.0/index.php?lat=30.33&lng=-81.65"
  },
  {
    "name": "Fort Worth",
    "monthsGained": 3.8,
    "link": "https://ashrae-meteo.info/v2.0/index.php?lat=32.75&lng=-97.33"
  },
  {
    "name": "Columbus",
    "monthsGained": 3.4,
    "link": "https://ashrae-meteo.info/v2.0/index.php?lat=39.96&lng=-83.0"
  },
  {
    "name": "Indianapolis",
    "monthsGained": 2.0,
    "link": "https://ashrae-meteo.info/v2.0/index.php?lat=39.77&lng=-86.16"
  }
];

export default function SchwankROICalculator() {
  const [area, setArea] = useState(900);
  const [spend, setSpend] = useState(40);
  const [occupancy, setOccupancy] = useState(60);
  const [days, setDays] = useState(20);
  const [grossMargin, setGrossMargin] = useState(65);
  const [selectedHeater, setSelectedHeater] = useState(heaters[0]);
  const [selectedCity, setSelectedCity] = useState(cityData[0]);

  const monthsGained = selectedCity.monthsGained;
  const seats = area / 18;
  const dailyRevenue = seats * (occupancy / 100) * spend;
  const monthlyRevenue = dailyRevenue * days;
  const annualRevenue = monthlyRevenue * monthsGained;
  const grossProfit = annualRevenue * (grossMargin / 100);
  const gasCost = 319 * monthsGained;
  const netProfit = grossProfit - gasCost;
  const numHeaters = Math.ceil(area / selectedHeater.coverage);
  const heaterCost = numHeaters * selectedHeater.cost;
  const installCost = 8000;
  const totalCost = heaterCost + installCost;
  const roi = ((netProfit - totalCost) / totalCost) * 100;
  const profit5yr = (netProfit * 5) - totalCost;

  return (
    <div className="p-6 grid gap-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold">Schwank Patio Heater ROI Calculator</h1>
      <Card>
        <CardContent className="grid gap-4 pt-4">
          <Label>Patio Area (sq ft)</Label>
          <Input type="number" value={area} onChange={(e) => setArea(Number(e.target.value))} />

          <Label>Average Spend per Person ($)</Label>
          <Input type="number" value={spend} onChange={(e) => setSpend(Number(e.target.value))} />

          <Label>Average Occupancy (%)</Label>
          <Input type="number" value={occupancy} onChange={(e) => setOccupancy(Number(e.target.value))} />

          <Label>Days Used per Month</Label>
          <Input type="number" value={days} onChange={(e) => setDays(Number(e.target.value))} />

          <Label>Gross Margin (%)</Label>
          <Input type="number" value={grossMargin} onChange={(e) => setGrossMargin(Number(e.target.value))} />

          <Label>Select Location</Label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full justify-start">
                {selectedCity.name}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {cityData.map((city) => (
                <DropdownMenuItem key={city.name} onSelect={() => setSelectedCity(city)}>
                  {city.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Label>Select Heater Model</Label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full justify-start">
                {selectedHeater.name}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {heaters.map((heater) => (
                <DropdownMenuItem key={heater.name} onSelect={() => setSelectedHeater(heater)}>
                  {heater.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="grid gap-2 pt-4 text-sm">
          <div><strong>Location:</strong> {selectedCity.name} ({monthsGained} months added)</div>
          <div><strong>ASHRAE Climate Data:</strong> <a href={selectedCity.link} target="_blank" rel="noopener noreferrer">View</a></div>
          <div><strong>Seats:</strong> {seats.toFixed(0)}</div>
          <div><strong>Estimated Daily Revenue:</strong> ${dailyRevenue.toFixed(0)}</div>
          <div><strong>Annual Revenue (added months):</strong> ${annualRevenue.toFixed(0)}</div>
          <div><strong>Gross Profit:</strong> ${grossProfit.toFixed(0)}</div>
          <div><strong>Estimated Fuel Cost:</strong> ${gasCost.toFixed(0)}</div>
          <div><strong>Net Profit:</strong> ${netProfit.toFixed(0)}</div>
          <div><strong>Heaters Required:</strong> {numHeaters}</div>
          <div><strong>Heater Cost:</strong> ${heaterCost}</div>
          <div><strong>Total Investment (w/ install):</strong> ${totalCost}</div>
          <div><strong>ROI (1st Year):</strong> {roi.toFixed(0)}%</div>
          <div><strong>Total Profit Over 5 Years:</strong> ${profit5yr.toFixed(0)}</div>
        </CardContent>
      </Card>
    </div>
  );
}
