<?php

namespace App;

enum Category: string
{
    case Men = 'Men';
    case Women = 'Women';
    case U10 = 'o10';
    case U12 = 'o12';
    case U14 = 'o14';
    case U18 = 'o18';

    public function label(): string
    {
        return $this->value;
    }
    public function isYouth(): bool
    {
        return in_array($this, [self::U10, self::U12, self::U14, self::U18]);
    }

    public function isAdult(): bool
    {
        return in_array($this, [self::Men, self::Women]);
    }
}
