const securityAlarmTone: securityAlarmToneType = {
    alert1: 'SECURITY.CLOCK_SOUND1',
    alert2: 'SECURITY.CLOCK_SOUND2',
    alert3: 'SECURITY.CLOCK_SOUND3',
    alert4: 'SECURITY.CLOCK_SOUND4',
    alert5: 'SECURITY.CLOCK_SOUND5',
    doorbell1: 'SECURITY.DOOLBEEL_SOUND1',
    doorbell2: 'SECURITY.DOOLBEEL_SOUND2',
    doorbell3: 'SECURITY.DOOLBEEL_SOUND3',
    doorbell4: 'SECURITY.DOOLBEEL_SOUND4',
    doorbell5: 'SECURITY.DOOLBEEL_SOUND5',
    alarm1: 'SECURITY.ALARM_SOUND1',
    alarm2: 'SECURITY.ALARM_SOUND2',
    alarm3: 'SECURITY.ALARM_SOUND3',
    alarm4: 'SECURITY.ALARM_SOUND4',
    alarm5: 'SECURITY.ALARM_SOUND5'
}

interface securityAlarmToneType {
    [path: string]: string
}
export default securityAlarmTone;
