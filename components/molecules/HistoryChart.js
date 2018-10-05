import PropTypes from 'prop-types'
import moment from 'moment-immutable'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from 'recharts'

import CustomTooltip from './CustomTooltip'
import colors from '../../styles/colors'

export default function HistoryChart ({
  activities,
  minDistance,
  minPace,
  maxDistance,
  maxPace,
}) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={activities.map(a => { a.date = moment(a.startTime).format('M/D/YY'); return a })}
        width={600}
        height={300}
        margin={{ top: 0, right: 0, left: -10, bottom: 0 }}
      >
        <XAxis dataKey="startTime" tickFormatter={v => moment(v).format('M/D')} />
        <YAxis domain={[Math.min(minDistance, minPace), Math.max(maxDistance, maxPace)]} label={{ value: 'MPH', angle: -90, position: 'center', y: 100 }} />
        <YAxis domain={[90, 180]} yAxisId="right" orientation="right" tickFormatter={v => v || ''} label={{ value: 'BPM', angle: 90, position: 'center', dx: 15 }} />
        <Tooltip content={<CustomTooltip />} />
        <CartesianGrid strokeDasharray="1 6"/>
        <Line name="Pace" unit="mph" type="monotone" dataKey="minutePace" stroke={colors.green} strokeWidth={2} />
        <Line name="Distance" unit="miles" type="monotone" dataKey="distance" stroke={colors.blue} strokeWidth={2} />
        <Line yAxisId="right" name="HR" unit="bpm" type="monotone" dataKey="averageHeartRate" stroke={colors.orange} />
        <Legend />
      </LineChart>
    </ResponsiveContainer>
  )
}

HistoryChart.propTypes = {
  activities: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.string,
  })),
  minDistance: PropTypes.number,
  maxDistance: PropTypes.number,
  minPace: PropTypes.number,
  maxPace: PropTypes.number,
}
