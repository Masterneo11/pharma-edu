import React, { useState, useEffect } from 'react';

interface RxItem {
    id: number;
    name: string;
}

interface RxItemsListProps {
    onRxItemSelect: (selectedId: number) => void;
}

const RxItemsList: React.FC<RxItemsListProps> = ({ onRxItemSelect }) => {
    const [rxItems, setRxItems] = useState<RxItem[]>([]);
    const [filteredRxItems, setFilteredRxItems] = useState<RxItem[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [showDropdown, setShowDropdown] = useState<boolean>(false);

    // Fetch Rx items from API
    const fetchRxItems = async () => {
        try {
            const response = await fetch('http://localhost:8000/rxitems', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                const data = await response.json();
                setRxItems(data);
            } else {
                console.error('Failed to fetch Rx items');
            }
        } catch (error) {
            console.error('Error fetching Rx items:', error);
        }
    };

    useEffect(() => {
        fetchRxItems();
    }, []);

    // Filter Rx items based on search input
    const handleSearchChange = (value: string) => {
        setSearchTerm(value);
        if (value.trim() === '') {
            setFilteredRxItems([]);
            setShowDropdown(false);
        } else {
            const filtered = rxItems.filter((item) =>
                item.name.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredRxItems(filtered);
            setShowDropdown(true);
        }
    };

    const handleRxItemSelect = (rxItem: RxItem) => {
        setSearchTerm(rxItem.name); // Display the name in the input field
        setShowDropdown(false);
        onRxItemSelect(rxItem.id); // Store only the ID
    };

    return (
        <div className="rx-item-search">
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Search Rx Items"
            />
            {showDropdown && (
                <div className="rx-item-dropdown">
                    {filteredRxItems.length > 0 ? (
                        filteredRxItems.map((item) => (
                            <div
                                key={item.id}
                                className="rx-item-dropdown-item"
                                onClick={() => handleRxItemSelect(item)}
                            >
                                {item.name} (ID: {item.id})
                            </div>
                        ))
                    ) : (
                        <div className="no-rx-items">No Rx items found</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default RxItemsList;
