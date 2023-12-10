"use client";
import React, { useEffect, useState } from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Button,
} from "@nextui-org/react";

interface InterviewType {
    companyName: string;
    status: string;
    salary: string;
}

export default function Interviews() {
    const [interviews, setInterviews] = useState([]);

    useEffect(() => {}, []);

    const fetchInterviews = () => {
        fetch("/api/interviews", {
            method: "GET",
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setInterviews(data.data);
            });
    };

    return (
        <div>
            <Table aria-label="Example static collection table">
                <TableHeader>
                    <TableColumn>COMPANY NAME</TableColumn>
                    <TableColumn>STATUS</TableColumn>
                    <TableColumn>SALARY</TableColumn>
                </TableHeader>
                <TableBody>
                    {interviews.map((item: InterviewType, index) => (
                        <TableRow key={index}>
                            <TableCell>{item.companyName}</TableCell>
                            <TableCell>{item.status}</TableCell>
                            <TableCell>{item.salary}</TableCell>
                        </TableRow>
                    ))}

                    {/*                <TableRow key="2">
                    <TableCell>Zoey Lang</TableCell>
                    <TableCell>Technical Lead</TableCell>
                    <TableCell>Paused</TableCell>
                </TableRow>
                <TableRow key="3">
                    <TableCell>Jane Fisher</TableCell>
                    <TableCell>Senior Developer</TableCell>
                    <TableCell>Active</TableCell>
                </TableRow>
                <TableRow key="4">
                    <TableCell>William Howard</TableCell>
                    <TableCell>Community Manager</TableCell>
                    <TableCell>Vacation</TableCell>
                </TableRow>*/}
                </TableBody>
            </Table>
            <Button onClick={fetchInterviews}>Fetch data</Button>
        </div>
    );
}
