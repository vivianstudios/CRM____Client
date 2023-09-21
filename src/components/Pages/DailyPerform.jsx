import { useSelector } from "react-redux";

const DailyPerform = () => {
  const { currentUser } = useSelector((state) => state.users);

  const dailyRp = [...currentUser?.daily];

  const getEfficiency = (achieve, target) => {
    const result = (achieve / target) * 100;
    if (result == "Infinity") {
      return 0;
    }
    return result ? result.toFixed(2) : 0;
  };

  return (
    <div className="w-full mx-auto mt-5 ">
      <table className=" w-full  ">
        {/* head*/}
        <thead className="text-center">
          <tr className=" border h-16">
            <th className="bg-blue-500 capitalize  font-bold "> date</th>
            <th className="bg-blue-500 capitalize  font-bold "> call target</th>
            <th className="bg-blue-500 capitalize  font-bold ">
              {" "}
              call attempt{" "}
            </th>
            <th className="bg-blue-500 capitalize  font-bold ">
              {" "}
              call achieve
            </th>
            <th className="bg-blue-500 capitalize  font-bold "> high lead </th>
            <th className="bg-blue-500 capitalize  font-bold "> new test </th>
            <th className="bg-blue-500 capitalize  font-bold ">
              satisfactory <br /> achievement
            </th>
            <th className="bg-blue-500 capitalize  font-bold ">best effort</th>
            <th className="bg-blue-500 capitalize  font-bold ">first login</th>
            <th className="bg-blue-500 capitalize  font-bold ">last update</th>
          </tr>
        </thead>
        <tbody className=" text-center  ">
          {dailyRp.reverse().map((day) => (
            <tr key={day._id} className=" h-20">
              <td className="border">{day.title}</td>
              <td className="border"> {day.callTarget} </td>
              <td className="border">
                {
                  day.bit.filter(
                    (d) =>
                      d.status == "Gatekeeper" ||
                      d.status == "Follow-up" ||
                      d.status == "Contacted" ||
                      d.status == "Not available" ||
                      d.status == "Voice mail"
                  ).length
                }
              </td>
              <td className="border">
                {" "}
                {
                  day.bit.filter(
                    (d) =>
                      d.status == "Gatekeeper" ||
                      d.status == "Follow-up" ||
                      d.status == "Contacted"
                  ).length
                }
              </td>
              <td className="border">
                {" "}
                {day.bit.filter((d) => d.possibility == "High").length}{" "}
              </td>
              <td className="border">
                {" "}
                {day.bit.filter((d) => d.status == "New test").length}{" "}
              </td>
              <td className="border">
                {getEfficiency(
                  day.bit.filter(
                    (d) =>
                      d.status == "Gatekeeper" ||
                      d.status == "Follow-up" ||
                      d.status == "Contacted"
                  ).length,
                  day.callTarget
                )}
                %
              </td>
              <td className="border">
                {getEfficiency(
                  day.bit.filter(
                    (d) =>
                      d.status == "Gatekeeper" ||
                      d.status == "Follow-up" ||
                      d.status == "Contacted" ||
                      d.status == "Not available" ||
                      d.status == "Voice mail"
                  ).length,
                  day.callTarget
                )}
                %
              </td>
              <td className="border">{day.firstLogin}</td>
              <td className="border">{day.lastUpdate}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="w-full h-2 bg-gray-400"> </div>
    </div>
  );
};

export default DailyPerform;
