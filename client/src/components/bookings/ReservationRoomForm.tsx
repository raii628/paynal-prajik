import React from "react";

const ReservationRoomForm = () => {
  return (
    <div className="space-y-4">
      {/* Check-in and Check-out in the same row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="font-semibold">Check-in</label>
          <input
            type="date"
            className="w-full border rounded-md p-3 mt-1"
            required
          />
        </div>
        <div>
          <label className="font-semibold">Check-out</label>
          <input
            type="date"
            className="w-full border rounded-md p-3 mt-1"
            required
          />
        </div>
      </div>

      {/* People Field */}
      <div>
        <label className="font-semibold">People</label>
        <input
          type="number"
          min="1"
          className="w-full border rounded-md p-3 mt-1"
          placeholder="Number of Guests"
          required
        />
      </div>
    </div>
  );
};

export default ReservationRoomForm;
