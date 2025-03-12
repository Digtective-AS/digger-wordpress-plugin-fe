import React from 'react';
import Logo from '../../assets/icons/digtective_logo.svg'

const TopHeader = () => {
    return (
        <div className="bg-white w-[calc(100%-20px)] rounded-lg mt-4 px-[32px] py-[24px] flex justify-between items-center">
            <div>
                <img src={Logo} alt=""/>
            </div>
            <div className="flex gap-2 items-center">
                <button className="bg-primary px-5 py-3 text-white rounded-[6px] text-[16px]">Whats new?</button>
                <button className="bg-[#EAEAEA] px-5 py-3 text-[#828282] rounded-[6px] text-[16px]">Version: 1.0.5</button>
            </div>
        </div>
    );
};

export default TopHeader;