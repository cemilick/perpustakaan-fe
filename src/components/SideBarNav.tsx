import React, { Component } from "react"
import { Card, CardTitle } from "react-bootstrap";
import { FaBook, FaBookOpen, FaClipboardCheck, FaHandHolding, FaList, FaPlus, FaStore, FaUserPlus, FaUsers } from "react-icons/fa";
import { FaHandsHoldingCircle, FaNoteSticky, FaPlaneUp } from "react-icons/fa6";
import { Menu, MenuItem, Sidebar, SubMenu } from "react-pro-sidebar"
import { Link, useLocation } from "react-router-dom";

export const SideBarNav: React.FC = () => {
    const location = useLocation();

    return (<Sidebar style={{ minHeight: '100vh', top: 0, left: 0, position: 'absolute', minWidth: 300 }}>
        <Menu menuItemStyles={{
            button: ({ level, active, disabled }) => {
                // only apply styles on first level elements of the tree
                if (level === 0) {
                    return {
                        color: '#d359ff',
                        backgroundColor: active ? '#eecef9' : 'undefined',
                        '&:hover': {
                            backgroundColor: '#f5d9ff',
                        },
                        fontWeight: 'bolder',
                        fontSize: '1.2em',
                        textAlign: 'left',
                    };
                } else {
                    return {
                        textAlign: 'left',
                    }
                }
            },
        }}>
            <div style={{ margin: 10 }}>
                <FaStore size={50} style={{ color: '#d359ff', marginRight: 10 }} />
                <div style={{ fontSize: '1.5em', fontWeight: 'bolder', color: '#d359ff' }}>Perpustakaan</div>
            </div>
            <hr style={{ color: '#d359ff' }} />
            <SubMenu label="Customers" open disabled>
                <MenuItem icon={<FaUsers size={15} />} component={<Link to={'/customers'} />}> Daftar Customer </MenuItem>
                <MenuItem icon={<FaUserPlus size={15} />} component={<Link to={'/customers/create'} />}> Tambah Customer </MenuItem>
            </SubMenu>
            <SubMenu label="Buku" open disabled>
                <MenuItem icon={<FaBook size={15} />} component={<Link to={'/books'} />}> Daftar Buku </MenuItem>
                <MenuItem icon={<FaBookOpen size={15} />} component={<Link to={'/books/create'} />}> Tambah Buku </MenuItem>
            </SubMenu>
            <SubMenu label="Transaksi" open disabled>
                <MenuItem icon={<FaNoteSticky size={15} />} component={<Link to={'/transactions'} />}> Daftar Peminjaman Buku </MenuItem>
                <MenuItem icon={<FaHandsHoldingCircle size={15} />} component={<Link to={'/transactions/rent'} />}> Pinjam Buku </MenuItem>
                <MenuItem icon={<FaClipboardCheck size={15} />} component={<Link to={'/transactions/return'} />}> Kembalikan Buku </MenuItem>
            </SubMenu>
        </Menu>
    </Sidebar>)
}