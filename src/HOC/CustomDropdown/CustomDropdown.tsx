import React, { useState } from 'react';
import {
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  FormHelperText,
  IconButton,
  ListItemIcon,
  ListItemText,
  SelectChangeEvent,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './CustomDropdown.css';

export interface DropdownOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

interface CustomDropdownProps {
  // Label props
  label?: string;
  showRequired?: boolean;

  // Placeholder
  placeholder?: string;

  // Value props
  value?: string;
  onChange?: (value: string) => void;

  // Options
  options: DropdownOption[];

  // States
  disabled?: boolean;
  error?: boolean;
  errorMessage?: string;

  // Additional props
  id?: string;
  name?: string;
  fullWidth?: boolean;
  size?: 'small' | 'medium';
  className?: string;

  // Clearable
  allowClear?: boolean;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  // Label props
  label,
  showRequired = false,

  // Placeholder
  placeholder = 'Select an option',

  // Value props
  value,
  onChange,

  // Options
  options = [],

  // States
  disabled = false,
  error = false,
  errorMessage = '',

  // Additional props
  id,
  name,
  fullWidth = true,
  size = 'medium',
  className = '',

  // Clearable
  allowClear = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (event: SelectChangeEvent<string>) => {
    const newValue = event.target.value as string;
    if (onChange) {
      onChange(newValue);
    }
  };

  const handleClear = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (onChange) {
      onChange('');
    }
  };

  const handleOpen = () => {
    if (!disabled) {
      setIsOpen(true);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  // Get display value for the selected item
  const getSelectedLabel = () => {
    if (!value) return '';
    const selectedOption = options.find((option) => option.value === value);
    return selectedOption?.label || '';
  };

  const inputId = id || `dropdown-${name || Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={`custom-dropdown-wrapper ${className}`}>
      <FormControl
        fullWidth={fullWidth}
        error={error}
        disabled={disabled}
        size={size}
        className="custom-dropdown-formcontrol"
      >
        {/* Label */}
        {label && (
          <InputLabel
            id={`${inputId}-label`}
            className={`custom-dropdown-label ${value ? 'has-value' : ''}`}
            shrink={!!value || isOpen}
          >
            {label}
            {showRequired && <span className="required-asterisk"> *</span>}
          </InputLabel>
        )}

        <Select
          labelId={`${inputId}-label`}
          id={inputId}
          name={name}
          value={value || ''}
          onChange={handleChange}
          onOpen={handleOpen}
          onClose={handleClose}
          open={isOpen}
          displayEmpty
          className={`custom-dropdown-select ${error ? 'has-error' : ''} ${isOpen ? 'dropdown-open' : ''}`}
          MenuProps={{
            className: 'custom-dropdown-menu',
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'left',
            },
            transformOrigin: {
              vertical: 'top',
              horizontal: 'left',
            },
            PaperProps: {
              className: 'custom-dropdown-paper',
            },
          }}
          IconComponent={ExpandMoreIcon}
          renderValue={(selected) => {
            if (!selected) {
              return (
                <span className="dropdown-placeholder">{placeholder}</span>
              );
            }
            return <span className="dropdown-selected-value">{getSelectedLabel()}</span>;
          }}
          endAdornment={
            allowClear && value ? (
              <IconButton
                onClick={handleClear}
                onMouseDown={(e) => e.stopPropagation()}
                size="small"
                className="clear-button"
                aria-label="Clear selection"
              >
                <ClearIcon fontSize={size === 'small' ? 'small' : 'medium'} />
              </IconButton>
            ) : null
          }
        >
          {options.map((option, index) => (
            <MenuItem
              key={`${option.value}-${index}`}
              value={option.value}
              className={`custom-dropdown-menuitem ${value === option.value ? 'selected' : ''}`}
            >
              {option.icon && (
                <ListItemIcon className="menuitem-icon">
                  {option.icon}
                </ListItemIcon>
              )}
              <ListItemText
                primary={option.label}
                className="menuitem-text"
              />
            </MenuItem>
          ))}
        </Select>

        {/* Error Message */}
        {error && errorMessage && (
          <FormHelperText className="custom-dropdown-error">
            {errorMessage}
          </FormHelperText>
        )}
      </FormControl>
    </div>
  );
};

export default CustomDropdown;

