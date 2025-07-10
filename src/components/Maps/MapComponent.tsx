// import LiveLocationMap from "./LiveLocationMap";
import LiveTracker from "./LiveTracker";


function MapComponent() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white px-5 pb-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
      <div className="flex flex-col gap-5 mb-6 sm:flex-row sm:justify-between">
        <div className="w-full">
          {/* <LiveLocationMap /> */}
          <LiveTracker />
        </div>
      </div>
    </div>
  )
}

export default MapComponent;