import React from 'react';
import Link from "next/link";

const Page = () => {
    return (
        <div>
            <h2>Develop progress</h2>
            <h4>Needs:</h4>
            <ul>
                <li>Дизайн</li>
                <li>Новости</li>
                <li>Решить проблему с Current Card</li>
                <p>Дополнить:</p>
                <li>Новые иконки</li>
                <li>Перевод</li>
            </ul>
            <Link href='/'><button>Return</button></Link>
        </div>
    );
};

export default Page;