import React, { useState } from "react";
import Diary from "./Diary";
import Notes from "./Notes";

function Home() {
    return (
        <div>
            <Diary />
            <Notes />
        </div>
    )
}

export default Home