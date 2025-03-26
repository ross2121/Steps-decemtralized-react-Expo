import android.content.Context
import android.database.sqlite.SQLiteDatabase
import android.database.sqlite.SQLiteOpenHelper
import android.util.Log

class AsyncStorageHelper(context: Context) : SQLiteOpenHelper(
    context,
    "/data/data/${context.packageName}/databases/RKStorage",
    null,
    1
) {
    override fun onCreate(db: SQLiteDatabase) {}
    override fun onUpgrade(db: SQLiteDatabase, oldVersion: Int, newVersion: Int) {}

    fun getAsyncStorageValue(key: String): String? {
        val db = readableDatabase
        var value: String? = null

        try {
            // Check if the table exists
            val cursor = db.rawQuery(
                "SELECT name FROM sqlite_master WHERE type='table' AND name='catalystLocalStorage'",
                null
            )
            val tableExists = cursor.moveToFirst()
            cursor.close()

            if (!tableExists) {
                Log.w("AsyncStorage", "Table 'catalystLocalStorage' does not exist")
                return null
            }

            // Query the table if it exists
            val queryCursor = db.query(
                "catalystLocalStorage",
                arrayOf("value"),
                "key = ?",
                arrayOf(key),
                null, null, null
            )

            if (queryCursor.moveToFirst()) {
                value = queryCursor.getString(0)
            }
            queryCursor.close()
        } catch (e: Exception) {
            Log.e("AsyncStorage", "Error reading from RKStorage", e)
        } finally {
            db.close()
        }

        return value
    }
}