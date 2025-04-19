from dataclasses import dataclass
from typing import List

@dataclass
class User:
    id: str
    skill_focus: str # e.g., "Handstand"
    available_time: int # in minutes (15, 30, 45)


@dataclass
class Workout:
    id: str
    name: str
    category: str  # "Warmup", "Skill", "Strength", "Cooldown"
    muscle_groups: optional[List[str]]
    progression_level: int
    video_url: Optional[str]